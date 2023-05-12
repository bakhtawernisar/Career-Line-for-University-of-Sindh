import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    light_blue: "#2d3352",
    light: "#E7E8F1",

    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "white",

    dark_gray: "#8B8A8A",
    purple: '#1E90FF'
}


export const SIZES = {
    base: 10,
    width,
    height,
    padding: 15,
    radius: 12
}