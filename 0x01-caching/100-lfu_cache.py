#!/usr/bin/python3
""" LFU caching module
"""
from base_caching import BaseCaching
from collections import OrderedDict


class LFUCache(BaseCaching):
    """ LFU caching module
    """

    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # delete the least frequently used item
            last = next(reversed(self.cache_data))
            self.cache_data.pop(last)
            print("DISCARD: {}".format(last))

        if key in self.cache_data:
            self.cache_data.pop(key)

        self.cache_data[key] = item
        self.cache_data[key] = self.cache_data.get(key, 0) + 1
        self.cache_data.move_to_end(key)

    def get(self, key):
        """ Get an item by key
        """
        if key is None:
            return None
        return self.cache_data.get(key)
