import React from 'react';
import ThemeA from './theme/dataa';

/**
 * 主题工厂
 */
class ThemeFactory {};

const Theme = {
    ThemeA,
};

/**
 * 获取实例
 * @param {Styles} theme 
 */
ThemeFactory.getThemeInstance = (theme = "") => {
    const Component = Theme[theme];
    return (
        Component
        ?
            <Component />
        :
            null
    );
};

/**
 * Styles
 * @property [String] ThemeA 主题风格
 */
const Styles = {
    ThemeA: "ThemeA"
}

export { ThemeFactory, Styles }