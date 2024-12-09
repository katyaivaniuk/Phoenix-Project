import numpy as np

def ahp_pairwise_comparison_matrix():
    """Creates the pairwise comparison matrix for AHP."""
    return np.array([
        [1, 7, 3],   
        [1/7, 1, 1/3],  
        [1/3, 3, 1]   
    ])

def calculate_ahp_weights(pairwise_matrix):
    """Calculates the weights and checks consistency for the AHP matrix."""
    column_sums = pairwise_matrix.sum(axis=0)
    normalized_matrix = pairwise_matrix / column_sums
    priority_vector = normalized_matrix.mean(axis=1)

    # Consistency check
    weighted_sum = np.dot(pairwise_matrix, priority_vector)
    lambda_max = (weighted_sum / priority_vector).mean()
    CI = (lambda_max - len(pairwise_matrix)) / (len(pairwise_matrix) - 1)
    RI = 0.58  # for 3x3 matrix
    CR = CI / RI

    if CR < 0.1:
        return priority_vector
    else:
        raise ValueError("The pairwise matrix is inconsistent (CR > 0.1). Please adjust the values.")

def prioritize_bridges(bridges):
    """Applies AHP to prioritize bridges within a region."""
    volume = np.array([bridge["Volume"] for bridge in bridges])
    cost = np.array([bridge["Reconstruction Costs"] for bridge in bridges])
    function = np.array([1 if bridge["Bridge Function"] == "Highway" else 0 for bridge in bridges])

    # Normalization
    total_volume = volume.sum()
    total_cost = cost.sum()

    normalized_volume = volume / total_volume
    normalized_cost = cost / total_cost

    # Get weights
    pairwise_matrix = ahp_pairwise_comparison_matrix()
    weights = calculate_ahp_weights(pairwise_matrix)

    # Calculate scores
    scores = (normalized_volume * weights[0]) + (normalized_cost * weights[1]) + (function * weights[2])

    for i, bridge in enumerate(bridges):
        bridge["AHP Score"] = scores[i]

    # Sort by score
    bridges_sorted = sorted(bridges, key=lambda x: x["AHP Score"], reverse=True)
    for rank, bridge in enumerate(bridges_sorted, start=1):
        bridge["Rank"] = rank

    return bridges_sorted
