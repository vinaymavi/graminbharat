from django.db import models


class PlanUnit(models.Model):
    name = models.CharField(max_length=250)
    value = models.IntegerField()
    add_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        self.name


class State(models.Model):
    name = models.CharField(max_length=250)
    value = models.IntegerField()
    add_date = models.DateTimeField(auto_now=True)
    plan_unit = models.ManyToManyField(PlanUnit, related_name="states")
    def __str__(self):
        return self.name

    def __unicode__(self):
        self.name

class District(models.Model):
    name = models.CharField(max_length=250)
    value = models.IntegerField()
    add_date = models.DateTimeField(auto_now=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="districts")
    def __str__(self):
        return self.name

    def __unicode__(self):
        self.name


class Block(models.Model):
    name = models.CharField(max_length=250)
    value = models.IntegerField()
    add_date = models.DateTimeField(auto_now=True)
    district = models.ForeignKey(
        District, on_delete=models.CASCADE, related_name="blocks"
    )
    def __str__(self):
        return self.name

    def __unicode__(self):
        self.name


class Village(models.Model):
    name = models.CharField(max_length=250)
    value = models.IntegerField()
    add_date = models.DateTimeField(auto_now=True)
    block = models.ForeignKey(Block, on_delete=models.CASCADE, related_name="villages")
    def __str__(self):
        return self.name

    def __unicode__(self):
        self.name

