import pygame
import sys
import random

# Inicializacao do pygame
pygame.init()

# Cores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Dimensoes da tela
WIDTH = 800
HEIGHT = 600

# Criar a tela
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong - Atari Style")

# Relogio para controlar a taxa de quadros
clock = pygame.time.Clock()
FPS = 60

# Propriedades das raquetes (paddles)
PADDLE_WIDTH = 15
PADDLE_HEIGHT = 100
PADDLE_SPEED = 7

# Propriedades da bola
BALL_SIZE = 15
BALL_SPEED_X = 5
BALL_SPEED_Y = 5

class Paddle:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT)

    def draw(self, surface):
        pygame.draw.rect(surface, WHITE, self.rect)

    def move(self, up_key, down_key, keys):
        if keys[up_key] and self.rect.top > 0:
            self.rect.y -= PADDLE_SPEED
        if keys[down_key] and self.rect.bottom < HEIGHT:
            self.rect.y += PADDLE_SPEED

class Ball:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, BALL_SIZE, BALL_SIZE)
        self.dx = BALL_SPEED_X * random.choice([1, -1])
        self.dy = BALL_SPEED_Y * random.choice([1, -1])

    def draw(self, surface):
        pygame.draw.rect(surface, WHITE, self.rect)

    def move(self):
        self.rect.x += self.dx
        self.rect.y += self.dy

        # Colisao com parede (cima e baixo)
        if self.rect.top <= 0 or self.rect.bottom >= HEIGHT:
            self.dy *= -1

def main():
    player1 = Paddle(50, HEIGHT // 2 - PADDLE_HEIGHT // 2)
    player2 = Paddle(WIDTH - 50 - PADDLE_WIDTH, HEIGHT // 2 - PADDLE_HEIGHT // 2)
    ball = Ball(WIDTH // 2 - BALL_SIZE // 2, HEIGHT // 2 - BALL_SIZE // 2)

    score1 = 0
    score2 = 0
    font = pygame.font.Font(None, 74)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        keys = pygame.key.get_pressed()
        player1.move(pygame.K_w, pygame.K_s, keys)
        player2.move(pygame.K_UP, pygame.K_DOWN, keys)

        ball.move()

        # Colisao com a raquete
        if ball.rect.colliderect(player1.rect) or ball.rect.colliderect(player2.rect):
            ball.dx *= -1
            # Aumenta ligeiramente a velocidade para tornar mais desafiador com o tempo
            if ball.dx > 0:
                ball.dx += 0.5
            else:
                ball.dx -= 0.5

        # Pontuacao
        if ball.rect.left <= 0:
            score2 += 1
            ball = Ball(WIDTH // 2 - BALL_SIZE // 2, HEIGHT // 2 - BALL_SIZE // 2)
        elif ball.rect.right >= WIDTH:
            score1 += 1
            ball = Ball(WIDTH // 2 - BALL_SIZE // 2, HEIGHT // 2 - BALL_SIZE // 2)

        # Desenho
        screen.fill(BLACK)
        
        # Linha central
        pygame.draw.aaline(screen, WHITE, (WIDTH // 2, 0), (WIDTH // 2, HEIGHT))

        player1.draw(screen)
        player2.draw(screen)
        ball.draw(screen)

        # Desenhar pontuacoes
        text1 = font.render(str(score1), True, WHITE)
        screen.blit(text1, (WIDTH // 4, 20))
        text2 = font.render(str(score2), True, WHITE)
        screen.blit(text2, (WIDTH * 3 // 4, 20))

        pygame.display.flip()
        clock.tick(FPS)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()