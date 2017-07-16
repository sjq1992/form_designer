package controller;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by sjq on 2017/6/27.
 */
@Controller
public class Login {
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection<Document> collection;

    @PostConstruct
    private void init(){
        mongoClient = new MongoClient( "localhost" , 27017 );
        mongoDatabase = mongoClient.getDatabase("db");
        collection = mongoDatabase.getCollection("users");
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> login(HttpServletRequest request) throws Exception{
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Document result = new Document();
        Document filter = new Document();
        filter.append("username",username);
        FindIterable<Document> iterables = collection.find(filter);
        MongoCursor<Document> cursor = iterables.iterator();
        if (cursor.hasNext()) {
            result = cursor.next();
        }
        Map<String, String> modelMap = new HashMap<String, String>();
        if(result.size() != 0){
            if(result.getString("password").equals(password)){
                modelMap.put("status", "0");
            }
            else{
                modelMap.put("status", "1");
            }
        }
        else{
            modelMap.put("status", "1");
        }
        return modelMap;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> register(HttpServletRequest request){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Map<String, String> modelMap = new HashMap<String, String>();
        Document result = new Document();
        Document filter = new Document();
        filter.append("username",username);
        FindIterable<Document> iterables = collection.find(filter);
        MongoCursor<Document> cursor = iterables.iterator();
        if (cursor.hasNext()) {
            result = cursor.next();
        }
        if(result.size() != 0){
            modelMap.put("status","1");
        }
        else{
            Document document = new Document();
            document.append("username",username);
            document.append("password",password);
            collection.insertOne(document);
            modelMap.put("status","0");
        }
        return modelMap;
    }

    @RequestMapping(value = "/home")
    public ModelAndView to(){
        ModelAndView modelAndView = new ModelAndView("home");
        return modelAndView;
    }


}
