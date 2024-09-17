from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

from core.common.db_connection import get_total_count

class RawQueriesPagination(LimitOffsetPagination):
    default_limit = 10
    # limit_query_param = 'l'
    # offset_query_param = 'o'
    max_limit = 50
    
    def get_total(self, query):
        query = 'SELECT COUNT(*) FROM artist'
        total = get_total_count(query, None)
        return total or 0
    
