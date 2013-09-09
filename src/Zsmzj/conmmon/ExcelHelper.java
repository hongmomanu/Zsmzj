package Zsmzj.conmmon;

import jxl.Workbook;
import jxl.format.*;
import jxl.format.Alignment;
import jxl.write.*;
import jxl.write.biff.RowsExceededException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
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
    public static Map<String,Object> writeExcel(String fileName,String header_arr,String rowdata,String sum,String title){
        WritableWorkbook wwb = null;
        Map<String,Object> map=new HashMap<String, Object>();
        int sumrow_index=0;
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
            JSONArray rowdatas=JSONArray.fromObject(rowdata);
            try {
                WritableFont font = new WritableFont(WritableFont.createFont("宋体"),
                        15,
                        WritableFont.BOLD,
                        false,
                        UnderlineStyle.NO_UNDERLINE);
                ws.mergeCells(0, 0, headers.size()-1, 0);
                Label labelTitle = new Label(0, 0, title);
                WritableCellFormat cellFormat=new WritableCellFormat();
                cellFormat.setAlignment(jxl.format.Alignment.CENTRE);
                cellFormat.setFont(font);
                labelTitle.setCellFormat(cellFormat);
                ws.addCell(labelTitle);
            } catch (WriteException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            WritableFont font = new WritableFont(WritableFont.createFont("宋体"),
                    10,
                    WritableFont.BOLD,
                    false,
                    UnderlineStyle.NO_UNDERLINE);
            for(int j=0;j<headers.size();j++){


                try {
                    String col_name=headers.getJSONObject(j).getString("value");
                    //添加表头
                    WritableCellFormat cellFormat=new WritableCellFormat();
                    cellFormat.setAlignment(jxl.format.Alignment.CENTRE);
                    cellFormat.setFont(font);
                    Label labelC = new Label(j, 1, headers.getJSONObject(j).getString("name"));
                    labelC.setCellFormat(cellFormat);
                    ws.addCell(labelC);

                    //添加行数据

                    for(int row_index=0;row_index<rowdatas.size();row_index++){
                        WritableCellFormat cellRowFormat=new WritableCellFormat();
                        cellRowFormat.setAlignment(jxl.format.Alignment.CENTRE);
                        sumrow_index=row_index+2;
                        Label labelRowC=null;
                        if(col_name.equals("index")){
                            labelRowC = new Label(j, sumrow_index,String.valueOf(row_index+1) );

                        }else{
                            labelRowC = new Label(j, sumrow_index, rowdatas.getJSONObject(row_index).
                                    getString(col_name));

                        }
                        labelRowC.setCellFormat(cellRowFormat);
                        ws.addCell(labelRowC);

                    }

                    //添加合计数据
                    JSONObject sum_item=JSONObject.fromObject(sum);
                    sumrow_index++;
                    Label labelSumC=null;
                    WritableCellFormat cellRowFormat=new WritableCellFormat();
                    cellRowFormat.setAlignment(jxl.format.Alignment.CENTRE);

                    if(j==0){
                        labelSumC = new Label(j, sumrow_index,"合计");
                        labelSumC.setCellFormat(cellRowFormat);
                        ws.addCell(labelSumC);

                    }else{
                        for(Object sum_name:sum_item.names()){
                            log.debug(sum_name+"---"+col_name);

                            if(col_name.equals(sum_name.toString())){
                                labelSumC = new Label(j, sumrow_index,sum_item.get(sum_name).toString());
                                labelSumC.setCellFormat(cellRowFormat);
                                ws.addCell(labelSumC);
                                break;
                            }
                        }
                    }



                    //添加表单数据
                    if(j==0){
                        sumrow_index++;
                        ws.mergeCells(0, sumrow_index, headers.size()/2-1, sumrow_index);
                        ws.mergeCells(headers.size()/2-1, sumrow_index, headers.size()-1, sumrow_index);
                        Label labelLast_head_C=new Label(0, sumrow_index,"填表人:          分管领导:");
                        WritableCellFormat cellLastRowHeaderFormat=new WritableCellFormat();
                        cellLastRowHeaderFormat.setAlignment(Alignment.LEFT);
                        cellLastRowHeaderFormat.setFont(font);
                        labelLast_head_C.setCellFormat(cellLastRowHeaderFormat);
                        ws.addCell(labelLast_head_C);

                        Label labelLast_tail_C=new Label(1, sumrow_index,"填表日期: 2013-09-09");
                        WritableCellFormat cellLastRowTailFormat=new WritableCellFormat();
                        cellLastRowTailFormat.setAlignment(Alignment.RIGHT);
                        cellLastRowTailFormat.setFont(font);
                        labelLast_tail_C.setCellFormat(cellLastRowTailFormat);
                        ws.addCell(labelLast_tail_C);




                    }


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
