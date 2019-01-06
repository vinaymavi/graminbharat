from django.contrib import admin
from .models import State, PlanUnit, District, Block, Village


admin.site.register(PlanUnit)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Block)
admin.site.register(Village)
