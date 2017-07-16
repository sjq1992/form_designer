package controller;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.gridfs.GridFS;
import com.mongodb.util.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.tags.Param;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.*;

@Controller
public class EditForm {
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private MongoCollection<Document> collection;

    @PostConstruct
    private void init(){
        mongoClient = new MongoClient( "localhost" , 27017 );
        mongoDatabase = mongoClient.getDatabase("db");
        collection = mongoDatabase.getCollection("fields");
    }

    private Document findTable(String title, String user){
        Document filter = new Document("user",user).append("title",title);
        FindIterable<Document> findIterable = collection.find(filter);
        MongoCursor<Document> mongoCursor = findIterable.iterator();
        if(!mongoCursor.hasNext()){
            return null;
        }
        else{
            return mongoCursor.next();
        }
    }
    private Document Str2Doc(String items) throws Exception{
        Document document = new Document();
        ObjectMapper mapper = new ObjectMapper();
        Map map = mapper.readValue(items, Map.class);
        Iterator entries = map.entrySet().iterator();
        while (entries.hasNext()) {
            Map.Entry entry = (Map.Entry) entries.next();
            String value = (String) entry.getValue();
            String key = (String) entry.getKey();
            document.append(key,value);
        }
        return document;
    }

    @RequestMapping(value = "/createform", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> createForm(HttpServletRequest request) throws Exception{
        Map<String, String> modelMap = new HashMap<String, String>();
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        String fields = request.getParameter("fields");
        Document result = findTable(title,user);
        if(result != null){
            String table_id = result.getString("_id");
            ObjectMapper mapper = new ObjectMapper();
            Map[] maps =  mapper.readValue(fields, Map[].class);
            ArrayList<Document> new_fields = new ArrayList<Document>();
            for(int i = 0; i < maps.length; i++) {
                Document field = new Document();
                String new_id = (String) maps[i].get("_id");
                field.append("_id", new_id);
                String new_type = (String) maps[i].get("type");
                field.append("type", new_type);
                String new_name = (String) maps[i].get("name");
                field.append("name", new_name);
                if (new_type.equals("_radio") || new_type.equals("_select")) {
                    List list = (ArrayList) maps[i].get("opts");
                    Document opts = new Document();
                    for (int j = 0; j < list.size(); j++) {
                        opts.append("" + j, list.get(j));
                    }
                    field.append("opts", list);
                } else if (new_type.equals("_text")) {
                    String date = (String) maps[i].get("date");
                    field.append("date", date);
                }
                new_fields.add(field);
            }
            Document newTable = new Document("title",title).append("user",user).append("_id", table_id).append("fields",new_fields);
            collection.deleteOne(Filters.eq("_id", table_id));
            collection.insertOne(newTable);
            modelMap.put("msg", "success");
            return modelMap;
        }
        else{
            String _id = UUID.randomUUID().toString();
            mongoDatabase.createCollection(_id);
            Document table = new Document("title",title).append("user",user).append("_id",_id);
            ObjectMapper mapper = new ObjectMapper();
            Map[] maps =  mapper.readValue(fields, Map[].class);
            ArrayList<Document> _fields = new ArrayList<Document>();
            for(int i = 0; i < maps.length; i++){
                Document field = new Document();
                _id = (String)maps[i].get("_id");
                field.append("_id",_id);
                String type = (String)maps[i].get("type");
                field.append("type",type);
                String name = (String)maps[i].get("name");
                field.append("name",name);
                if(type.equals("_text")){
                    String date = (String)maps[i].get("date");
                    field.append("date",date);
                }
                else if(type.equals("_radio") || type.equals("_select")){
                    List list = (ArrayList)maps[i].get("opts");
                    Document opts = new Document();
                    for(int j = 0; j <list.size(); j++){
                        opts.append(""+j,list.get(j));
                    }
                    field.append("opts",list);
                }
                _fields.add(field);
            }
            table.append("fields",_fields);
            collection.insertOne(table);
            modelMap.put("msg", "success");
        }
        return modelMap;
    }

    @RequestMapping(value = "/removeform", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> removeForm(HttpServletRequest request) throws Exception{
        Map<String, String> modelMap = new HashMap<String, String>();
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        Document result = findTable(title,user);
        if(result != null){
            String table_id = result.getString("_id");
            collection.deleteOne(Filters.eq("_id", table_id));
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            table.drop();
            modelMap.put("msg", "success");
        }
        else{
            modelMap.put("msg","success");
        }
        return modelMap;
    }

    @RequestMapping(value = "/queryform", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryForm(HttpServletRequest request) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        Document result = findTable(title,user);
        if(result != null){
            modelMap.put("msg","success");
            Map<String, Object> map = new HashMap<String, Object>();
            map.putAll(result);
            modelMap.put("table",map);
        }
        else{
            modelMap.put("msg","nonexist");
        }
        return modelMap;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> add(HttpServletRequest request) throws Exception{
        Map<String, String> modelMap = new HashMap<String, String>();
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        String items = request.getParameter("items");

        Document result = findTable(title,user);
        if(result != null){
            String table_id = result.getString("_id");
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            Document document = Str2Doc(items);
            table.insertOne(document);
            modelMap.put("msg", "success");
        }
        else {
            modelMap.put("msg","nonexist");
        }
        return modelMap;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> update(HttpServletRequest request) throws Exception{
        Map<String, String> modelMap = new HashMap<String, String>();
        String user = request.getParameter("user");
        String title = request.getParameter("title");
        String items = request.getParameter("items");
        String _id = request.getParameter("_id");

        Document result = findTable(title,user);
        if(result != null){
            String table_id = result.getString("_id");
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            Document document = Str2Doc(items);
            document.put("_id",_id);
            table.deleteOne(Filters.eq("_id", _id));
            table.insertOne(document);
            modelMap.put("msg", "success");
        }
        else {
            modelMap.put("msg","nonexist");
        }
        return modelMap;
    }

    @RequestMapping(value = "/query", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> query(HttpServletRequest request) throws Exception{
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        String param = request.getParameter("param");
        String flag = request.getParameter("flag");
        int page =  Integer.parseInt(request.getParameter("page"));
        Map<String,Object> map = new HashMap<String, Object>();
        Document filter = new Document("user",user).append("title",title);
        FindIterable<Document> findIterable = collection.find(filter);
        MongoCursor<Document> mongoCursor = findIterable.iterator();
        if(mongoCursor.hasNext()){
            Document result = mongoCursor.next();
            String table_id = result.getString("_id");
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            filter = new Document();
            if(param != null){
                JSONObject jsonObject = JSONObject.fromObject(param);
                Iterator it = jsonObject.keys();
                while (it.hasNext())
                {
                    String key = String.valueOf(it.next());
                    String value = (String) jsonObject.get(key);
                    filter.append(key,value);
                }
            }
            List<Document> list = new ArrayList<Document>();
            long total = table.count(filter);
            map.put("total",total);
            if(flag == null){
                findIterable = table.find(filter).skip((page-1)*10).limit(10);
            }
            mongoCursor = findIterable.iterator();
            while(mongoCursor.hasNext()){
                Document data = mongoCursor.next();
                list.add(data);
            }
            map.put("msg","success");
            map.put("data",list);
        }
        return map;
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> remove(HttpServletRequest request) throws Exception{
        Map<String, String> modelMap = new HashMap<String, String>();
        String _id = request.getParameter("_id");
        String title = request.getParameter("title");
        String user = request.getParameter("user");

        Document result = findTable(title,user);
        if(result != null){
            String table_id = result.getString("_id");
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            table.deleteOne(Filters.eq("_id", _id));
            modelMap.put("msg","success");
        }
        else{
            modelMap.put("msg","nonexisted");
        }
        return modelMap;
    }

    @RequestMapping(value = "/removefield", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> removeField(HttpServletRequest request){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        String field = request.getParameter("field");

        Document result = findTable(title,user);
        if(result != null){
            ArrayList list = (ArrayList)result.get("fields");
            for(int i = 0; i <list.size(); i++){
                Map temp = (Map)list.get(i);
                if(temp.get("name").equals(field)){
                    list.remove(i);
                }
            }
            Document newField = new Document("fields",list);
            collection.updateOne(new Document("user",user).append("title",title),new Document("$set",newField));
            String table_id = result.getString("_id");
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            table.updateMany(new Document(),new Document("$unset",new Document(field,"")));
            modelMap.put("msg","success");
        }
        else{
            modelMap.put("msg","success");
        }
        return modelMap;
    }

    @RequestMapping(value = "/uploadfile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> upload(@RequestParam(value = "image", required = false) MultipartFile image, HttpServletRequest request) throws Exception{
        String row_id = request.getParameter("row_id");
        String col_id = request.getParameter("col_id");
        String title = request.getParameter("title");
        String user = request.getParameter("user");
        Map<String,String> map = new HashMap<String, String>();

        Document result = findTable(title,user);
        if(result != null){
            String table_id = result.getString("_id");
            MongoCollection<Document> table = mongoDatabase.getCollection(table_id);
            FindIterable<Document> findIterable = table.find(Filters.eq("_id", row_id));
            MongoCursor<Document> mongoCursor = findIterable.iterator();
            if(mongoCursor.hasNext()){
                String filename = UUID.randomUUID().toString();
                String filepath = "H:/idea/dynamic-form/target/mongo_spring/resources/img/"+filename+".jpg";
                FileOutputStream fos = new FileOutputStream(filepath);
                fos.write(image.getBytes());
                Document document = mongoCursor.next();
                document.put(col_id,filename);
                table.updateOne(Filters.eq("_id", row_id), new Document("$set",document));
            }
            map.put("msg", "success");
        }
        return map;
    }

}
