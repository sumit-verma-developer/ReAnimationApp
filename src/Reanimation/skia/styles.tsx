import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292525ff',
    },
    canvas: {
        flex: 1,
    },

    playCar:{
        position: 'absolute',
        left: 0,    
    },
    carImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
scoreDisplay: {
    position: "absolute",
    top: 40,
    zIndex: 2,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
},
currentScore: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
},
speedText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
},
gameOver: {
    position: "absolute",
    top: '40%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -50 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 3,
},
gameOverText: {
    color: "white",
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
},
scoreText: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
},
restartButton: {
    marginTop: 20,
    backgroundColor: '#ff5555',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
},
restartText: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
},

})