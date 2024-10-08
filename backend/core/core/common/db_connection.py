from django.db import connection, IntegrityError ,DatabaseError

from django.core.exceptions import ValidationError

from rest_framework.exceptions import APIException

def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_total_count(query, param):
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, param)
            return cursor.fetchone()[0]
            
    except (IntegrityError, DatabaseError, Exception) as exe:
        raise APIException(exe)


def insert_query_to_db(query, param)->None:
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, param)
            
    except (IntegrityError, DatabaseError, Exception) as exe:
        raise APIException(exe)
    

def fetch_data_from_db(query, param):
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, param)
            data = dictfetchall(cursor)
            return data
            
    except (IntegrityError, DatabaseError, Exception) as exe:
        raise APIException(exe)
    
        
    