def calcular_estatisticas(numeros: list[float]) -> tuple[float, float, float, float]:
    """
    Calcula estatísticas descritivas de uma lista de números.
    
    Esta função computa o total (soma), média aritmética, valor máximo
    e valor mínimo de um conjunto de números fornecido.
    
    Args:
        numeros: Lista de números para análise estatística.
        
    Returns:
        Tupla contendo (total, média, máximo, mínimo).
        
    Raises:
        ValueError: Se a lista estiver vazia.
    """
    if not numeros:
        raise ValueError("A lista não pode estar vazia")
    
    total = sum(numeros)
    media = total / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)
    
    return total, media, maximo, minimo


if __name__ == "__main__":
    # Lista de números para análise
    numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    
    # Calcula as estatísticas
    total, media, maximo, minimo = calcular_estatisticas(numeros)
    
    # Exibe os resultados formatados
    print(f"Total:  {total}")
    print(f"Média:  {media:.1f}")
    print(f"Maior:  {maximo}")
    print(f"Menor:  {minimo}")