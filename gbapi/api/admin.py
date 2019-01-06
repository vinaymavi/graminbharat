from django.contrib import admin
from django.contrib.admin.sites import AdminSite

from .models import State, PlanUnit, District, Block, Village,Report

# Change admin site header
AdminSite.site_header = 'Gramin Bhart Admin Panel'
AdminSite.site_title = 'Gramin Bhart Admin Panel'
admin.site.register(PlanUnit)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Block)
admin.site.register(Village)
admin.site.register(Report)
