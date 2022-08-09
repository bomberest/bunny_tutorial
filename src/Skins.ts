import {InteractableSkinData} from "./Engine/UI";
import {TextStyle, TextStyleFontStyle} from "pixi.js";

export const UserNameBarSkin = "./assets/UI/user_name_bar.png";

export const PlayButtonSkin = new InteractableSkinData(
    "./assets/UI/play_button_active.png",
    "./assets/UI/play_button_hover.png",
    "./assets/UI/play_button_press.png"
)

export const LeaderboardButtonSkin = new InteractableSkinData(
    "./assets/UI/leadboard_button_active.png",
    "./assets/UI/leadboard_button_hover.png",
    "./assets/UI/leadboard_button_press.png"
)

export const PauseButtonSkin = new InteractableSkinData(
    "./assets/UI/btn_pause_active.png",
    "./assets/UI/btn_pause_hover.png",
    "./assets/UI/btn_pause_press.png"
)

export const FullscreenButtonSkin = new InteractableSkinData(
    "./assets/UI/btn_fullscreen_active.png",
    "./assets/UI/btn_fullscreen_hover.png",
    "./assets/UI/btn_fullscreen_press.png"
)

export const MiButtonSkin = new InteractableSkinData(
    "./assets/UI/login_button_active.png",
    "./assets/UI/login_button_hover.png",
    "./assets/UI/login_button_press.png"
)

export const SoundOffButtonSkin = new InteractableSkinData(
    "./assets/UI/btn_sound_0_active.png",
    "./assets/UI/btn_sound_0_hover.png",
    "./assets/UI/btn_sound_0_press.png"
)

export const SoundOnButtonSkin = new InteractableSkinData(
    "./assets/UI/btn_sound_1_active.png",
    "./assets/UI/btn_sound_1_hover.png",
    "./assets/UI/btn_sound_1_press.png"
)

export function whiteStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#FFFFFF",
        align: 'center'
    } as TextStyle;
}

export function blueStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#003E71",
        align: 'center'
    } as TextStyle;
}

export function greenStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack', fontSize: fontSize, fill: "#03FD16", align: 'center',
        dropShadow: true,
        dropShadowDistance: 7,
        dropShadowAlpha: 0.5,
        dropShadowAngle: 360
    } as TextStyle;
}