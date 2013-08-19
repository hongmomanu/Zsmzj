package Zsmzj.conmmon;

import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-19
 * Time: 上午10:17
 * To change this template use File | Settings | File Templates.
 */
public class FileHelper {
    private static final Logger log = Logger.getLogger(FileHelper.class);
    public String saveUploadFile( List<FileItem> fileitems,String filepath){
        try {
            for (FileItem item : fileitems) {
                if (item.isFormField()) {
                    String name = item.getFieldName();
                    String value = item.getString();

                    // 转换下字符集编码
                    value = new String(value.getBytes("iso-8859-1"), "utf-8");
                    System.out.println(name + "=" + value);
                } else {
                    String filename = item.getName();
                    String extName = filename.substring(filename.lastIndexOf(".") );
                    //log.debug(item.getContentType());
                    File file = new File(filepath, StringHelper.getTimeStr()+extName);
                    //没有目录，则初始化
                    file.getParentFile().mkdirs();
                    file.createNewFile();
                    // 获得流，读取数据写入文件
                    InputStream in = item.getInputStream();
                    FileOutputStream fos = new FileOutputStream(file);

                    int len;
                    byte[] buffer = new byte[1024];
                    while ((len = in.read(buffer)) > 0)
                        fos.write(buffer, 0, len);
                    // 关闭资源文件操作
                    fos.close();
                    in.close();
                    // 删除临时文件
                    item.delete();

                }
            }
            return "{success:true}";
        } catch (Exception e) {
            e.printStackTrace();
            return "{success:false}";
        }

    }


}
