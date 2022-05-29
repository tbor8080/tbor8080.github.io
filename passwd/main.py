import random,hashlib,os,sys
str='abcdefghijklmnopqrstuvwxyz1234567890-_1234567890-_1234567890-_1234567890-_1234567890-_1234567890-_1234567890-_1231234567890-_'
count=8

# print(random.randint(0,len(str)-1))
seed = "dr0w88ap"
for i in range(0,count):
    r = random.randint(0,len(str)-1)
    if r % 2 == 0:
        seed+=str[r].upper()
    else:
        seed+=str[r].lower()
hex = hashlib.sha256(seed.encode()).hexdigest()
print("出力内容:",seed, hex)
answer=input("この内容でよろしいですか？[Y/n]")
if answer.upper() not in "" and answer.upper() in "Y":
    os.system(f"mkdir {hex}")
    os.system(f"echo '#:{seed}'> {hex}/index.html")
    os.system(f"ls -l {hex}")
    os.system(f"cat {hex}/index.html")
