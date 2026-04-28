"""
Módulo para verificação e manipulação de números primos.

Este módulo fornece funções eficientes para verificar primalidade
e gerar listas de números primos usando algoritmos otimizados.
"""

from typing import List


def eh_primo(numero: int) -> bool:
    """
    Verifica se um número inteiro é primo.
    
    Utiliza otimização de raiz quadrada para melhor performance.
    Complexidade temporal: O(√n)
    Complexidade espacial: O(1)
    
    Args:
        numero: Número inteiro a ser verificado.
        
    Returns:
        True se o número é primo, False caso contrário.
        
    Raises:
        TypeError: Se o argumento não for um inteiro.
        
    Examples:
        >>> eh_primo(17)
        True
        >>> eh_primo(20)
        False
        >>> eh_primo(2)
        True
    """
    # Validação de entrada
    if not isinstance(numero, int):
        raise TypeError(f"Esperado int, recebido {type(numero).__name__}")
    
    # Números menores ou iguais a 1 não são primos por definição
    if numero <= 1:
        return False
    
    # 2 é o único número primo par
    if numero == 2:
        return True
    
    # Números pares maiores que 2 não podem ser primos
    if numero % 2 == 0:
        return False
    
    # Verifica divisibilidade por números ímpares até √numero
    # Otimização: se numero tem divisor d > √numero, 
    # então tem divisor correspondente numero/d < √numero
    limite_superior = int(numero ** 0.5) + 1
    
    for divisor_teste in range(3, limite_superior, 2):
        if numero % divisor_teste == 0:
            return False
    
    return True


def listar_primos(inicio: int, fim: int) -> List[int]:
    """
    Gera lista de todos os números primos em um intervalo.
    
    Args:
        inicio: Limite inferior do intervalo (inclusivo).
        fim: Limite superior do intervalo (inclusivo).
        
    Returns:
        Lista de números primos no intervalo especificado.
        
    Examples:
        >>> listar_primos(10, 30)
        [11, 13, 17, 19, 23, 29]
    """
    if not isinstance(inicio, int) or not isinstance(fim, int):
        raise TypeError("Ambos os argumentos devem ser inteiros")
    
    if inicio > fim:
        return []
    
    return [num for num in range(inicio, fim + 1) if eh_primo(num)]


def contar_primos(inicio: int, fim: int) -> int:
    """
    Conta quantos números primos existem em um intervalo.
    
    Args:
        inicio: Limite inferior do intervalo (inclusivo).
        fim: Limite superior do intervalo (inclusivo).
        
    Returns:
        Quantidade de números primos no intervalo.
        
    Examples:
        >>> contar_primos(1, 10)
        4
    """
    return len(listar_primos(inicio, fim))


# ============================================================================
# TESTES E EXEMPLOS
# ============================================================================

if __name__ == "__main__":
    # Exemplos de uso da função eh_primo()
    print("=" * 60)
    print("VERIFICAÇÃO DE NÚMEROS PRIMOS")
    print("=" * 60)
    
    numeros_teste = [1, 2, 3, 4, 5, 10, 17, 20, 29, 100, 97, 121]
    
    print("\n📊 Teste Individual:")
    print("-" * 60)
    
    for num in numeros_teste:
        eh_primo_resultado = eh_primo(num)
        status = "✓ PRIMO" if eh_primo_resultado else "✗ NÃO PRIMO"
        print(f"  {num:3d} → {status}")
    
    # Exemplo 2: Listar primos em um intervalo
    print("\n" + "=" * 60)
    print("PRIMOS EM INTERVALOS")
    print("=" * 60)
    
    intervalos = [(1, 20), (20, 50), (100, 120)]
    
    for inicio, fim in intervalos:
        primos = listar_primos(inicio, fim)
        quantidade = len(primos)
        print(f"\n📍 De {inicio} até {fim}: {quantidade} primo(s)")
        print(f"   {primos}")
    
    # Exemplo 3: Contar primos
    print("\n" + "=" * 60)
    print("CONTAGEM DE PRIMOS")
    print("=" * 60)
    
    ranges = [(1, 10), (1, 100), (1, 1000)]
    
    for inicio, fim in ranges:
        quantidade = contar_primos(inicio, fim)
        print(f"  Primos de {inicio:4d} até {fim:4d}: {quantidade:4d}")
    
    # Exemplo 4: Tratamento de erros
    print("\n" + "=" * 60)
    print("VALIDAÇÃO DE ENTRADA")
    print("=" * 60)
    
    print("\n  Testando com argumento inválido:")
    try:
        eh_primo("17")  # String em vez de int
    except TypeError as erro:
        print(f"  ❌ Erro capturado: {erro}")
    
    print("\n✅ Todos os testes completados com sucesso!")
