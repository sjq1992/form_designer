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

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class Home {
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection<Document> collection;

    @PostConstruct
    private void init(){
        mongoClient = new MongoClient( "localhost" , 27017 );
        mongoDatabase = mongoClient.getDatabase("db");
        collection = mongoDatabase.getCollection("fields");
    }

    private Document getTable(String user){
        Document filter = new Document();
        Document table = new Document();
        filter.append("user",user);
        FindIterable<Document> iterables = collection.find(filter);
        MongoCursor<Document> cursor = iterables.iterator();
        if (cursor.hasNext()) {
            table = cursor.next();
        }
        return table;
    }

    @RequestMapping(value = "/formlist", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> query(HttpServletRequest request) throws Exception{
        request.setCharacterEncoding("utf-8");
        String user = request.getParameter("user");
        Document filter = new Document("user",user);
        List<Map<String,String>> list = new ArrayList<Map<String,String>>();
        Map<String,Object> map = new HashMap<String, Object>();
        FindIterable<Document> findIterable = collection.find(filter);
        MongoCursor<Document> mongoCursor = findIterable.iterator();
        while(mongoCursor.hasNext()){
            Document data = mongoCursor.next();
            String title = data.getString("title");
            Map<String,String> temp = new HashMap<String, String>();
            temp.put("title",title);
            list.add(temp);
        }
        map.put("data",list);
        return map;
    }

    @RequestMapping(value = "/editform")
    public ModelAndView to(){
        ModelAndView modelAndView = new ModelAndView("editform");
        return modelAndView;
    }

    @RequestMapping(value = "/chartform")
    public ModelAndView to1(){
        ModelAndView modelAndView = new ModelAndView("chart");
        return modelAndView;
    }
}
