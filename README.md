# JSM2T1
node main <command> <path> [params]

To update info in note use that example:

node main update <path to json> <title , which your want to find> --newNote=  --newBody=

list <path> - to print all notes 

read <path> <title> - read note by title

remove <path> <title> - remove note by title

toExcel <inpath> <outpath> inpath - path to json outpath - path to xlsx

readExcel <json> <xlsx> - json - path to json file, in which you want to write info from excel

update <path> <title>

'sort <path> <type> <order>' - options for order[desc,asc]  options for type[date,note length,'title length']
