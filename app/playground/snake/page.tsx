"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const GRID_SIZE = 15; // Reduced for mobile
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

type Position = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(20);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Calculate cell size based on container width
  useEffect(() => {
    const calculateCellSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 32; // padding
        const maxCellSize = Math.floor(containerWidth / GRID_SIZE);
        setCellSize(Math.min(maxCellSize, 30)); // Max 30px cells
      }
    };

    calculateCellSize();
    window.addEventListener('resize', calculateCellSize);
    return () => window.removeEventListener('resize', calculateCellSize);
  }, []);

  // Load high score from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    const onSnake = snake.some((s) => s.x === newFood.x && s.y === newFood.y);
    return onSnake ? generateFood() : newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 10, y: 10 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const checkCollision = (head: Position): boolean => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return snake.some((segment) => segment.x === head.x && segment.y === head.y);
  };

  const changeDirection = (newDir: Position) => {
    // Prevent reversing direction
    if (
      (newDir.x !== 0 && direction.x === 0) ||
      (newDir.y !== 0 && direction.y === 0)
    ) {
      setDirection(newDir);
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }

      switch (e.key) {
        case "ArrowUp":
          changeDirection({ x: 0, y: -1 });
          e.preventDefault();
          break;
        case "ArrowDown":
          changeDirection({ x: 0, y: 1 });
          e.preventDefault();
          break;
        case "ArrowLeft":
          changeDirection({ x: -1, y: 0 });
          e.preventDefault();
          break;
        case "ArrowRight":
          changeDirection({ x: 1, y: 0 });
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        if (checkCollision(newHead)) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snakeHighScore", score.toString());
          }
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, direction, food, score, highScore, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasSize = GRID_SIZE * cellSize;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw grid
    ctx.strokeStyle = "#2a2a2a";
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#22c55e" : "#16a34a";
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize - 1,
        cellSize - 1
      );
    });

    // Draw food
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize - 1, cellSize - 1);
  }, [snake, food, cellSize]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <Link href="/playground" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
        ← Back to Playground
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">🐍 Snake Game</h1>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">High Score</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{highScore}</p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            className="border-4 border-gray-800 rounded max-w-full"
          />
        </div>

        {/* Touch Controls for Mobile */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4 md:hidden">
          <div></div>
          <button
            onClick={() => changeDirection({ x: 0, y: -1 })}
            className="bg-gray-700 text-white p-4 rounded-lg active:bg-gray-600"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <div></div>
          <button
            onClick={() => changeDirection({ x: -1, y: 0 })}
            className="bg-gray-700 text-white p-4 rounded-lg active:bg-gray-600"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div></div>
          <button
            onClick={() => changeDirection({ x: 1, y: 0 })}
            className="bg-gray-700 text-white p-4 rounded-lg active:bg-gray-600"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div></div>
          <button
            onClick={() => changeDirection({ x: 0, y: 1 })}
            className="bg-gray-700 text-white p-4 rounded-lg active:bg-gray-600"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div></div>
        </div>

        {!gameStarted && !gameOver && (
          <div className="text-center">
            <p className="text-base sm:text-lg mb-4">
              <span className="hidden md:inline">Press any arrow key to start!</span>
              <span className="md:hidden">Tap the arrows to start!</span>
            </p>
            <button
              onClick={resetGame}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 mb-2">Game Over!</p>
            <p className="text-lg mb-4">Final Score: {score}</p>
            {score > highScore && (
              <p className="text-green-600 font-semibold mb-4">New High Score! 🎉</p>
            )}
            <button
              onClick={resetGame}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Play Again
            </button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div className="text-center text-gray-600">
            <p className="hidden md:block">Use arrow keys to move</p>
            <p className="md:hidden">Use the buttons below to move</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        <ul className="space-y-2 text-gray-700">
          <li>🎮 <span className="hidden md:inline">Use arrow keys</span><span className="md:hidden">Tap the direction buttons</span> to control the snake</li>
          <li>🍎 Eat the red food to grow and score points</li>
          <li>💀 Don't hit the walls or yourself!</li>
          <li>🏆 Try to beat your high score</li>
        </ul>
      </div>
    </div>
  );
}
