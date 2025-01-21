import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from test_filter_service import *
from test_search_service import *
from test_nlp import *
from test_ranking_service import *
from test_recommendation_service import *

# test_filter_service()
test_search_service()
# test_nlp_service()
# test_ranking_service()
#test_recommendation_service()