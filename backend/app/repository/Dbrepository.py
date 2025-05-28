import threading
class CRUDRepository():

    _instances = {}
    _locks = {}
    _global_lock = threading.Lock()  # Only for lock creation

    def __init__(self, model):
        self.model = model

    @classmethod
    def get_instance(cls):
        # Ensure per-class lock exists (protected by global lock)
        if cls not in cls._locks:
            with cls._global_lock:
                if cls not in cls._locks:
                    cls._locks[cls] = threading.Lock()
        # Double-checked locking for instance creation
        if cls not in cls._instances:
            with cls._locks[cls]:
                if cls not in cls._instances:
                    cls._instances[cls] = cls()
        return cls._instances[cls]
    
    def create(self,**kwargs):
        obj = self.model.objects.create(**kwargs)
        return obj
    
    def object_by_id(self,id):
        data = self.model.objects.filter(id=id)
        if(len(data) > 0):
            return data[0]
        return None
    
    def update(self,**kwargs):
        id = kwargs['id']
        del kwargs['id']
        self.model.objects.filter(id = id).update(**kwargs)

    def all_objects(self):
        return self.model.objects.all()
    
    def count(self):
        return self.model.objects.count()
    
    def search(self,**kwargs):
        return self.model.objects.filter(**kwargs)

    def search_pagination(self,limit,offset,**kwargs):
        return self.model.objects.filter(**kwargs)[int(offset):(int(offset)+int(limit))]

    def object_by_uuid(self,UUID):
        data = self.model.objects.filter(uuid = UUID)
        if(len(data) > 0):
            return data[0]
        else:
            return None

    def update_by_uuid(self,**kwargs):
        uuid = kwargs['uuid']
        del kwargs['uuid']
        self.model.objects.filter(uuid = uuid).update(**kwargs)