/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
var CommonFunc={

    removeTask:function(mask,el){
        var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
            mask.fadeOut({
                duration: 1000,
                remove:true
            });
            mask.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function() {
                        el.unmask();
                    }
                }
            });
        });
        // Run the fade 500 milliseconds after launch.
        task.delay(500);


    }



}