import numpy as np

gestures = dict()
threshold = 0.5

def get_confidence(distances, mean_std):
    """
    Get confidence of match between detected hand and existing gesture
    
    Args:
        distances [np array] array of distances from hand detection
        mean_std [np array] mean_std array of stored gesture to validate against

    Return:
        confidence [float] confidence in the match
    """

    dist_sum = np.sum(np.abs(np.subtract(mean_std[:,0], distances)))
    std_sum = np.sum(mean_std[:, 1])
    confidence = 1 - (abs(dist_sum - std_sum) / std_sum)
    return confidence


def store_gesture(mean_std, key):
    """
    Store a gesture

    Args:
        mean_std [np array] mean_std array of stored gesture to validate against
        key [str] identifier for gesture
    """
    gestures[key] = mean_std


def predict_gesture(distances):
    """
    Predict if hand detection is gesture

    Args:
        distances [np array] array of distances from hand detection
    
    Return:
        key [str] key of detection
    """

    g_max = 0
    g_key = None
    for key in gestures.keys():
        confidence = get_confidence(distances, gestures[key])
        # print(f"{key}: {confidence}")
        if g_max < confidence:
            g_key = key
            g_max = confidence
    
    if g_max > threshold:
        return g_key
    
    return None
         