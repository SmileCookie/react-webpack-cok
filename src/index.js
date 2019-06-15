import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import $ from 'jquery';
import { add } from './math.js';
import store from './redux';
import LanguageProvider from 'components/languageProvider';
import translationMessages from './lng';

add(66)
/*初始化*/
renderWithHotReload(Router);

/*热更新*/
if (module.hot) {
    module.hot.accept("./router/index.js", () => {
        const Router = require("./router/index.js").default;
        renderWithHotReload(Router);
    });
}

function renderWithHotReload(Router) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store()}>
                <LanguageProvider messages={translationMessages}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </LanguageProvider>
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    );
}

// 判断该浏览器支不支持 serviceWorker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log('service-worker registed')
            })
            .catch(error => {
                console.log('service-worker registed error')
            })
    })
}