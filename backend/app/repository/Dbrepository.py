class CRUDRepository():

    def __init__(self,model):
        self.model = model
    
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