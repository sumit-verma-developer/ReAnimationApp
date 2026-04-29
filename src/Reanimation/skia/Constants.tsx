import { Dimensions, ImageSourcePropType } from "react-native";

export const { width, height } = Dimensions.get("window");

export const LANE_WIDTH = width / 3;
export const CAR_WIDTH = LANE_WIDTH * 0.8;
export const CAR_HEIGHT = CAR_WIDTH * 2;
export const OBSTACLE_HEIGHT = 100;
export const INITIAL_SPEED = 3;
export const SPEED_INCREMENT = 0.2;
export const MIN_SPAWN_INTERVAL = 2000;
export const MAX_SPAWN_INTERVAL = 3500;
export const ROAD_LINE_HEIGHT = 80;
export const ROAD_LINE_GAP = 120;


export const LANE_CENTERS = [
    LANE_WIDTH / 2 - CAR_WIDTH / 2,
    LANE_WIDTH * 1.5 - CAR_WIDTH / 2,
    LANE_WIDTH * 2.5 - CAR_WIDTH / 2
]


export const obstacleImages = [
    require("../../assets/img/car/blackCar.png"),
    require("../../assets/img/car/blueCar.png"),
    require("../../assets/img/car/yellowCar.png"),

]


export interface Obstacle {
    id: string;
    x: number;
    y: number;
    speed: number;
    lane: number;
    image: ImageSourcePropType;
}

export interface RoadLine {
    id: string;
    x: number;
    y: number;

}


