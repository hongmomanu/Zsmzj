/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
var CommonFunc={

    updateitemnum:function(item,count){
        var text=item.el.dom.innerText;
        var before_str=text.slice(0,text.indexOf("(")+1);
        var after_str=text.slice(text.indexOf(")"));
        item.update(before_str+count+after_str);
        item.doLayout();

    },
    removeTask:function(mask,el){
        var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
            try{
                mask.fadeOut({
                    duration: 1000,
                    remove:true
                });
                mask.next().fadeOut({
                    duration: 1000,
                    remove:true,
                    listeners: {
                        afteranimate: function() {
                            try{
                                el.unmask();
                            }catch (e){

                            }

                        }
                    }
                });

            }catch (e){

            }

        });
        // Run the fade 500 milliseconds after launch.
        task.delay(500);


    }



}