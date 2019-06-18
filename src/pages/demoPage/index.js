/**
 * action
 * @description 
 * 通过路由直接调此Js。作用action. 
 * 所有的视图能抽离的全部置于components 高度抽象 例如 list list-item  或者  form   如果带业务场景的 置于该业务场景下面。 命名 例如 xxx.view.js 如果带业务且被公用置于components/business.
 * 所有的事件，数据获取，置于此层。
 * 获取数据后向下分发，视图组件负责消费。
 * 注释写法也在此 demo
 * @author luchao.ding
 */
import React from 'react';

// 获取该模块的mock,当发生异常直接使用mock的数据替换。
import MockA from 'mock/A';
import MockB from 'mock/B';

class DemoPage extends React.Component{
    constructor(props){
        super(props);

        // 跟控制视图相关的内容（和业务有关的），form表单的放置于此， 业务逻辑处理过程中需要的标志位禁止放在state中。
        this.state = {
            // form 相关的
            // 用户名称
            username: '',
            // 用户年龄
            age: '',
            // 控制相关的
            // 是否显示列表
            showMsgList: false,
        }

        // A业务
        this.A = null;
        // B业务
        this.B = null;
    }
    componentDidMount(){
        // 负责获取数据
        console.log(MockA);
    }
    render(){
        return (
            <div>
                123
            </div>
        )
    }
}

export default DemoPage;