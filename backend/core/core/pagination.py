import math

from rest_framework.pagination import LimitOffsetPagination

from core.common.db_connection import get_total_count

class RawQueriesPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 50
    
    def get_total(self, query):
        total = get_total_count(query, None)
        return total or 0
    
    def page_size(self, query):
        """ return page size and total size of data
        """
        total = self.get_total(query)
        
        if total > 0:
            return (math.ceil(total / self.default_limit)), total
        
        return 0, total
            
        
    
