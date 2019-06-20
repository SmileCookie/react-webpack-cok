/**
 * action
 * @description 
 * 通过路由直接调此Js。作用action. 
 * 所有的视图能抽离的全部置于components 高度抽象 例如 list list-item  或者  form   如果带业务场景的 置于该业务场景下面。 命名 例如 xxx.view.js 如果带业务且被公用置于components/business.
 * 所有的事件，数据获取，置于此层。
 * 获取数据后向下分发，视图组件负责消费。
 * 注释写法也在此 demo
 * 关于提高编辑提示的内容就不要用简写了。
 * @author luchao.ding
 */
import React from 'react';

// 获取模型数据
import {DemoPageModel} from './index.model.js';
import {MB} from './index.modelB';

// 获取过渡页面样式 注意高频度用的内容不要用简写形式否则编辑无法自动提示！！！
import {ThemeFactory, Styles} from '../../components/transition';

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
        console.log(123, this.props);
        // 负责获取数据
        DemoPageModel().then((res)=>{
            this.A = res;
            this.forceUpdate();
        });

        // 模型B
        MB().then(res => {
            this.B = res;
        })
    }
    render(){
        return (
            <div>
                123
                {
                    !this.A ? 
                    ThemeFactory.getThemeInstance(Styles.ThemeA)
                    :
                    <div>
                        name: {this.A.name}
                        id: {this.A.id}
                    </div>
                }
                {
                    !this.B ? 
                    ThemeFactory.getThemeInstance(Styles.ThemeA)
                    :
                    console.log(this.B)
                }
            </div>
        )
    }
}

export default DemoPage;