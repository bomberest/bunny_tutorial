import {TextStyle} from "pixi.js";
import {InteractableSkinData} from "./Engine/UI/InteractableSkinData";

export const UserNameBarSkin: string = "./assets/UI/user_name_bar.png";
export const CoinScorePlateSkin: string = "./assets/UI/coin_score_plate.png";
export const CollectCoinIconSkin: string = "./assets/UI/collect_coin_icon.png";
export const CollectDistanceIconSkin: string = "./assets/UI/collect_distance_icon.png";

export const Place1Skin: string = "./assets/UI/place_1.png";
export const Place2Skin: string = "./assets/UI/place_2.png";
export const Place3Skin: string = "./assets/UI/place_3.png";
export const PlaceAnySkin: string = "./assets/UI/midleader_name_plate.png";
export const MiddleLeaderCountBarSkin: string = "./assets/UI/midleader_scores_plate.png";
export const HighLeaderCountBarSkin: string = "./assets/UI/highleader_scores_plate.png";

export const OkButtonSkin = new InteractableSkinData(
    "./assets/UI/ok_button_active.png",
    "./assets/UI/ok_button_hover.png",
    "./assets/UI/ok_button_press.png"
)

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

export const NextButtonSkin = new InteractableSkinData(
    "./assets/UI/arrow_btn_active.png",
    "./assets/UI/arrow_btn_hover.png",
    "./assets/UI/arrow_btn_press.png"
)

export function whiteStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#FFFFFF",
        align: 'center'
    } as TextStyle;
}

export function place1Style(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#C26000",
        align: 'center'
    } as TextStyle;
}

export function place2Style(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#1F5CAD",
        align: 'center'
    } as TextStyle;
}

export function place3Style(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#8A1A00",
        align: 'center'
    } as TextStyle;
}

export function placeAnyStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack',
        fontSize: fontSize,
        fill: "#333333",
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

export function goldStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack', fontSize: fontSize, fill: "#F4AD26", align: 'center',
        dropShadow: true,
        dropShadowDistance: 7,
        dropShadowAlpha: 0.5,
        dropShadowAngle: 360
    } as TextStyle;
}

export function lightBlueStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack', fontSize: fontSize, fill: "#9AC6FF", align: 'center',
        dropShadow: true,
        dropShadowDistance: 7,
        dropShadowAlpha: 0.5,
        dropShadowAngle: 360
    } as TextStyle;
}

export function orangeStyle(fontSize: number): TextStyle {
    return {
        fontFamily: 'ZubiloBlack', fontSize: fontSize, fill: "#FF6801", align: 'center',
        dropShadow: true,
        dropShadowDistance: 7,
        dropShadowAlpha: 0.5,
        dropShadowAngle: 360
    } as TextStyle;
}