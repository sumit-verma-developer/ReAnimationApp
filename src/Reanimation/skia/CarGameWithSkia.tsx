import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGesture,
} from 'react-native-gesture-handler';
import { styles } from './styles';
import { Canvas, Group, Rect } from '@shopify/react-native-skia';
import {
  CAR_HEIGHT,
  CAR_WIDTH,
  height,
  INITIAL_SPEED,
  LANE_CENTERS,
  LANE_WIDTH,
  MIN_SPAWN_INTERVAL,
  OBSTACLE_HEIGHT,
  obstacleImages,
  ROAD_LINE_GAP,
  ROAD_LINE_HEIGHT,
  RoadLine,
  SPEED_INCREMENT,
  width,
} from './Constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const CarGameWithSkia = () => {
  const [roadLine, setRoadLine] = useState<RoadLine[]>([]);
  const [translationX, setTranslationX] = useState(0);
  const [score, setScore] = useState(0); // Added score state
  const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED); // Added gameSpeed state
  const [gameOver, setGameOver] = useState(false); // Added gameOver state
  const lastSpawnTime = useSharedValue(0); // Added lastSpawnTime for obstacle spawning
  const [obstacles, setObstacles] = useState<any[]>([]); // Added obstacles state
  const playerX = useSharedValue(LANE_CENTERS[1]);
  const playerY = height - CAR_HEIGHT - 20;

  useEffect(() => {
    const totalLines = Math.ceil(height / ROAD_LINE_HEIGHT + ROAD_LINE_GAP) + 1;
    const lines: RoadLine[] = [];
    for (let i = 0; i < totalLines; i++) {
      lines.push({
        id: `line-${i}`,
        y: i * (ROAD_LINE_HEIGHT + ROAD_LINE_GAP) - ROAD_LINE_HEIGHT,
        x: 0,
      });
    }
    setRoadLine(lines);
  }, []);

  const pangesture = Gesture.Pan()
    .onUpdate(e => {
      const currentLane = Math.round(playerX.value / LANE_WIDTH);
      const targetLane = Math.max(
        0,
        Math.min(2, Math.round((playerX.value + e.translationX) / LANE_WIDTH)),
      );

      if (currentLane !== targetLane) {
        playerX.value = withSpring(LANE_CENTERS[targetLane], {
          stiffness: 200,
          damping: 20,
        });
      }
    })
    .activeOffsetX([-10, 10]);

  const playerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: playerX.value }],
  }));

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setGameSpeed(INITIAL_SPEED);
    playerX.value = LANE_CENTERS[1];
    setObstacles([]);
    lastSpawnTime.value = 0;
  };

 const getSafeLanes = useCallback(() => {
  const dangerZone = height / 2;

  const occupiedLanes = new Set(
    obstacles
      .filter((obs) => obs.y < dangerZone)
      .map((obs) => obs.lane)
  );

  return [0, 1, 2].filter((lane) => {
    if (occupiedLanes.has(lane)) return false;

    const leftLane = lane - 1;
    const rightLane = lane + 1;

    const adjacentBlocked =
      leftLane >= 0 &&
      occupiedLanes.has(leftLane) &&
      rightLane <= 2 &&
      occupiedLanes.has(rightLane);

    return !adjacentBlocked;
  });
}, [obstacles, playerX.value,height]);


const spawnObstacle = useCallback(() => {
  const now = Date.now();

  // Prevent spawning too fast
  if (now - lastSpawnTime.value < MIN_SPAWN_INTERVAL) return;

  const safeLanes = getSafeLanes();
  if (safeLanes.length === 0) return;

  // Pick random safe lane
  const lane =
    safeLanes[Math.floor(Math.random() * safeLanes.length)];

  // Slight random speed variation
  const obstacleSpeed = gameSpeed + (Math.random() - 0.5);

  // Pick random obstacle image
  const randomImage =
    obstacleImages[
      Math.floor(Math.random() * obstacleImages.length)
    ];

  // Add new obstacle
  setObstacles((prev) => [
    ...prev,
    {
      id: `obs-${Date.now()}`,
      x: LANE_CENTERS[lane],
      y: -OBSTACLE_HEIGHT,
      speed: obstacleSpeed,
      lane,
      image: randomImage,
    },
  ]);

  // Update last spawn time
  lastSpawnTime.value = now;
}, [gameSpeed, getSafeLanes, obstacleImages]);



useEffect(() => {
  if (gameOver) return;

  const gameLoop = setInterval(() => {
    // Increase speed gradually
    setGameSpeed((prev) =>
      Math.min(prev + SPEED_INCREMENT / 100, 8)
    );

    // Move road lines
    setRoadLine((prev) =>
      prev.map((line) => {
        const newY = line.y + gameSpeed;

        if (newY >= height) {
          return {
            ...line,
            y: -ROAD_LINE_HEIGHT,
          };
        }

        return {
          ...line,
          y: newY,
        };
      })
    );

    // Spawn obstacles
    spawnObstacle();

    // Move obstacles + collision + score
    setObstacles((prev) => {
      return prev
        .map((obs) => {
          const newY = obs.y + obs.speed;

          // Collision detection
          const carOverlap =
            newY + OBSTACLE_HEIGHT > playerY &&
            newY < playerY + CAR_HEIGHT;

          const laneOverlap =
            Math.abs(obs.x - playerX.value) < CAR_WIDTH * 0.7;

          if (carOverlap && laneOverlap) {
            setGameOver(true);
          }

          return {
            ...obs,
            y: newY,
          };
        })
        .filter((obs) => {
          // Remove obstacle if out of screen
          if (obs.y > height) {
            setScore((prev) => prev + 1);
            return false;
          }
          return true;
        });
    });
  }, 16); // ~60 FPS

  return () => clearInterval(gameLoop);
}, [gameOver, gameSpeed, spawnObstacle]);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Canvas style={styles.canvas}>
          <Rect x={0} y={0} width={width} height={height} color="#333" />
          <Group>
            {roadLine.map((line, index) => {
              return (
                <>
                  <Rect
                    key={`${line.id}-1${index}`}
                    x={LANE_WIDTH - 5}
                    y={line.y}
                    width={10}
                    height={ROAD_LINE_HEIGHT}
                    color="#fff"
                  />
                  <Rect
                    key={`${line.id}-2${index}`}
                    x={LANE_WIDTH * 2 - 5}
                    y={line.y}
                    width={10}
                    height={ROAD_LINE_HEIGHT}
                    color="#fff"
                  />
                </>
              );
            })}
          </Group>
        </Canvas>

        <GestureDetector gesture={pangesture}>
          <Animated.View
            style={[
              styles.playCar,
              playerStyle,
              {
                bottom: 50,
                width: CAR_WIDTH,
                height: CAR_HEIGHT,
              },
            ]}
          >
            <Image
              source={require('../../assets/img/car/blackCar.png')}
              style={[
                styles.carImage,
                {
                  zIndex: 3,
                  width: CAR_WIDTH,
                  height: CAR_HEIGHT,
                  resizeMode: 'contain',
                },
              ]}
            />
          </Animated.View>
        </GestureDetector>
        <View style={styles.scoreDisplay}>
          <Text style={styles.currentScore}>Score: {score}</Text>
          <Text style={styles.speedText}>Speed: {gameSpeed.toFixed(1)}x</Text>
        </View>
        {gameOver && (
          <View style={styles.gameOver}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.scoreText}>Score: {score}</Text>

            <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
              <Text style={styles.restartText}>Restart</Text>
            </TouchableOpacity>
          </View>
        )}

        {obstacles?.map(obs => (
          <Image
            key={obs.id}
            source={obs.image}
            style={{
              position: 'absolute',
              left: obs.x,
              zIndex: 1,
              top: obs.y,
              width: CAR_WIDTH,
              height: CAR_HEIGHT,
              resizeMode: 'contain',
            }}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default CarGameWithSkia;
