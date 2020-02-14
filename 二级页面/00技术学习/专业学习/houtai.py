# -*- coding: utf-8 -*-
"""
Created on Thu Dec 26 13:22:26 2019

@author: miclover
"""

#from html.parser import HTMLParser
#from lxml import etree
#from bs4 import BeautifulSoup
#import re

import time

print("**************************************************")
print("**************欢迎进入html后台处理******************")
print("*******python:0;C++:1;Java:2;机器学习:3************")
print("*******深度学习:4;Linux:5;学习总结:6;其他:7*********")
print("**************************************************")


def read_and_write_more(file_name_title_more, data_tmp):
    key_word = "<article id=\"link\">"
    file_html = open(file_name_title_more,"r",encoding='utf-8') #读取文件
    data = []
    for line in file_html:
        data.append(line)
        if(key_word in line):
            data.append(data_tmp)
         
    file_html.close()
    
    f1 = open(file_name_title_more,"w",encoding='utf-8')
    for j in data:
        f1.write(j)
    f1.close()
    
    
    
    
    
def read_and_write(file_name_title,file_name_title_more,key_word,line_set):
    
    file_html = open(file_name_title,"r",encoding='utf-8') #读取文件
    data = []
    index = 0
    idx = 0
    for line in file_html:
        if(key_word in line):
            idx = index
        data.append(line) 
        index += 1
    file_html.close()
    
    if(idx != 0):
        data_tmp = data[idx+8]
        data[idx+8] = data[idx+7]
        data[idx+7] = data[idx+6]
        data[idx+6] = data[idx+5]
        data[idx+5] = data[idx+4]
        data[idx+4] = data[idx+3]
        data[idx+3] = data[idx+2]
        data[idx+2] = data[idx+1]
        data[idx+1] = line_set
        read_and_write_more(file_name_title_more, data_tmp)
    
    
    f1 = open(file_name_title,"w",encoding='utf-8')
    for j in data:
        f1.write(j)
    f1.close()
    
def main():
    url1 = "            <li><a href=\""
    url3 = "\" target='_black'><span>"
    url4 = time.strftime('%Y-%m-%d',time.localtime(time.time()))
    url5 = "</span>"
    url7 = "</a></li>\n"
    sym = "\\"
    
    key_words = ["<ul id = \"0\">","<ul id = \"1\">","<ul id = \"2\">",
                "<ul id = \"3\">","<ul id = \"4\">",
                "<ul id = \"5\">","<ul id = \"6\">",
                "<ul id = \"7\">","<ul id = \"8\">",
                "<ul id = \"9\">","<ul id = \"10\">",
                "<ul id = \"11\">","<ul id = \"12\">",]
    
    title = ["python.html","C++.html","Java.html",
             "机器学习.html","深度框架.html",
             "Linux.html","学习总结.html","TechCol.html"]
    file_name_no= input("请输入目录(例如0)：")
    url2 = input("请输入地址：")
    url6 = input("请输入题目：")
    
    file_name_title = title[int(file_name_no)]
    line_set = url1 + url2 + url3 + url4 + url5 + url6 + url7
    if file_name_no == "0":
        file_name_title_more = "./更多/python/more_python.html"
        print("个人手札 = 0 \n有用网址 = 1 \n待分类 = 2 \n网络爬虫 = 3 \n扩展包 = 4 \n待分类 = 5\n")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "1":
        file_name_title_more = "./更多/C++/more_cpp.html"
        print("个人手札 = 0 面试总结 = 1 收藏网址 = 2")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "2":
        file_name_title_more = "./更多/Java/more_Java.html"
        print("个人手札 = 0 \n面试总结 = 1 \n收藏网址 = 2\n")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "3":
        file_name_title_more = "./更多/机器学习/more_机器学习.html"
        print("系统总结 = 0 \n代码收藏 = 1 \n基础概念 = 2")
        print("深度学习 = 3 \nmatlab = 4 \n个人手札 = 5\n")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "4":
        file_name_title_more = "./更多/深度框架/more_深度框架.html"
        print("基础知识 = 0 \nTensorflow = 1 \n安装技巧 = 2")
        print("代码收藏 = 3 \nKeras = 4 \n代码收藏 = 5")
        print("Pytorch = 6 \n比赛心得 = 7 \n收藏网址 = 8")
        print("Caffe = 9 \n比赛心得 = 10 \n收藏网址 = 11\n")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "5":
        file_name_title_more = "./更多/Linux/more_Linux.html"
        print("个人手札 = 0 \n比赛心得 = 1 \n收藏网址 = 2")
        print("收藏网址 = 3 \n收藏网址 = 4 \n收藏网址 = 5\n")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "6":
        file_name_title_more = "./更多/学习总结/more_学习总结.html"
        print("暂时固定不再改变！！！！！！")
#        key_word_no= input("请输入title(例如0)：")
#        key_word = key_words[int(key_word_no)]
#        read_and_write(file_name_title,file_name_title_more,key_word,line_set)
    elif file_name_no == "7":
        file_name_title_more = "./更多/TechCol/more_TechCol.html"
        print("个人手札 = 0 \n面试总结 = 1 \n收藏网址 = 2")
        print("Github资料 = 3 \nSQL基础知识 = 4 \n收藏网址 = 5\n")
        key_word_no= input("请输入title(例如0)：")
        key_word = key_words[int(key_word_no)]
        read_and_write(file_name_title,file_name_title_more,key_word,line_set)

if __name__ == "__main__":
    active = True 
    while active:
        main()
        message = input("确认推出吗？(quit):")
        if message =="quit" or message =="q":
            active = False














