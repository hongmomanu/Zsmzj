package Zsmzj.conmmon;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import net.sf.json.JSONArray;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-9
 * Time: 下午1:45
 * To change this template use File | Settings | File Templates.
 */
public class ExcelHelper {
    private static final Logger log = Logger.getLogger(ExcelHelper.class);
    public static Map<String,Object> writeExcel(String fileName,String header_arr,String rowdata,String sum){
        WritableWorkbook wwb = null;
        log.debug(fileName);
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("isok",false);
        try {
            //首先要使用Workbook类的工厂方法创建一个可写入的工作薄(Workbook)对象
            File file = new File(fileName);
            file.getParentFile().mkdirs();
            file.createNewFile();
            wwb = Workbook.createWorkbook(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(wwb!=null){
            //创建一个可写入的工作表
            //Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置
            WritableSheet ws = wwb.createSheet("sheet1", 0);
            JSONArray headers=JSONArray.fromObject(header_arr);

            for(int j=0;j<headers.size();j++){
                Label labelC = new Label(j, 0, headers.getString(j));
                try {
                    //将生成的单元格添加到工作表中
                    ws.addCell(labelC);
                } catch (RowsExceededException e) {
                    e.printStackTrace();
                } catch (WriteException e) {
                    e.printStackTrace();
                }

            }

            try {
                //从内存中写入文件中
                wwb.write();
                //关闭资源，释放内存
                wwb.close();
                map.put("isok", true);
                map.put("path",fileName);

            } catch (IOException e) {
                e.printStackTrace();
            } catch (WriteException e) {
                e.printStackTrace();
            }
        }
        return map;
    }

}
