import sublime, sublime_plugin,re

class htmltostringCommand(sublime_plugin.TextCommand):
    def run(self,edit):
        selstr = ''
        formatStr = ''
        region = []
        v = ''

        #get the content of selection
        sels = self.view.sel()
        for sel in sels:
            value = self.view.substr(sel)
            region = sel

        raw = value.split("\n") 
        length = len(raw) 

        #convert  ''+ format
        for i in range(length):
        	if raw[i] == '':
        		continue

        	v = re.sub(r'(\S)',lambda m: "'" + m.group(0) ,raw[i], count=1)
        	formatStr += v + "'"

        	if i != length-1 :
        		formatStr += "+\n"
        	else:
        		formatStr += ";"

        self.view.replace(edit,region,formatStr) 

