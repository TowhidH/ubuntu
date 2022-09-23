# 1
# def checkNumber() : 
#     a = input("number : ")
#     b = input("number : ")
#     if a == b :
#         return "yes"
#     else : 
#         return "no"
    
    
# print(checkNumber())

# 2
# def checkMorethan20ornot() : 
#     num = input("check more thn 20 or not : ")
#     if int(num) >= int(20) :
#         print("i am right")
#     else : 
#         print("nothing to say")
# checkMorethan20ornot()

# 3
# import math
# import re
# def findAvarage():
#     no1 = int(input("numer : "))
#     no2 = int(input("numer : "))
#     avg = math.floor((no1 + no2) / 2)
#     if int(no1) > int(avg)  : 
#         print(str(no1) + " is bigger than the avarage " +  str(avg)) 
#     elif int(no2) > int(avg):
#         print(str(no2) + " is bigger than the avarage " +  str(avg)) 
#     else:
#          print("none of the number is biger than the avarage" +  str(avg))
        
         
# findAvarage()

# 4
# Z = (43 % 4) > (2)
# print(Z)

# 5
# from array import *
# arr = array("i" , [55 , 55])

# def findOddorEven(): 


#      if (arr[0] % 5 % 2 == 0) and (arr[1] % 5 % 2 == 0)  : 
#           print("even")
#      else :
#           print("odd")


# findOddorEven()

# 6
# no = int(input("give number :  "))

# def check():
#     if no % 7 == 0 :
#         print("yes this number is divisable by 7")
#     else :
#      print("no this number is not divisable by 7")
#     if no % 5 == 0 :
#         print("yes this number is multipletable by 5")
#     else : 
#      print("no this number is not multipletable by 7")
# check()

# 7
# arr = [56 , 56]

# def check():
#     if arr[0] % arr[1] == 0 :
#         print("yes")
#     else :
#         print("no")

# check()

# # 8
# from array import *

# arr = [56, 89 , 23]
# arr.sort()
# print(str(arr[1]) + " is the second largest number")

# 9
# No = int(input("give a number : "))

# def check() : 
#     if No > 10 and No % 2 == 0 :
#         print("Yes")
#     else : 
#         print("No")

# check()

# 10
# No = int(input("give a number : "))

# def check() : 
#     if No > 10 and No % 2 == 0 :
#         print("Yes")
#     else : 
#         print("No")

# check()

# 11
# def check(argument) :
   
#       if argument >= 0 and argument <= 33:
#           print("fail") 
#       if argument >= 33 and argument < 44 :
#           print("D")
#       if argument >= 44 and argument < 54 : 
#           print("C")
#       if argument >= 54 and argument < 64 :
#           print("B")
#       if argument >= 64 and argument < 70 :
#           print("A-")
#       if argument >= 70 and argument < 80 :
#           print("A")
#       if argument >= 80 and argument < 90:
#           print("A+")
#       if argument >= 90 and argument < 100:
#           print("golden A+")
       


# check(74)

# 12
# import re
# def check (argument) : 


#    if re.search("[a-e A-B]", argument) == None : 
#     print(" no it does not include A,B,C,D,E")
#    else : 
#     print(f'argument includes "{argument}" from A,B,C,D,E')


# check("A")

# 13
# Number = int(input("give a number : "))

# def check():
#     if Number < 0 :
#        if Number > -5 : 
#         print("Hello")
#        else :
#         print("Hi") 
#     elif Number % 2 == 0 :
#         print("the Number is even")
#     else :
#         print("Odd")
# check()

# # 14
# Number = int(input("give a number : "))

# def Check():
#     if Number <= 0 and Number < -5 :
#         print("sondra")
#     else :
#         print("python")
#     if Number > 0 :
#         if Number % 3 == 0 :
#             print('yes the number is multiple of 3')
#         else : 
#             print("No the number is not multiple of 3")

# Check()

# 15
# from datetime import datetime
# def Check(argument):
#     print(argument)
#     match int(argument):
#         case 7:
#             print("it's time for your breakfast")
#         case 12:
#             return "it's time for your lunch"
#         case 18:
#             return "it's time for your dinner"
#         case default:
#             return "something"
        
# now = datetime.now()
# current_time = now.strftime("%H:%M:%S")
# table = Check(current_time.split(":")[0])
# print(table)


