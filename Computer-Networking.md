|                    |      |                    |        |
| ------------------ | ---- | ------------------ | ------ |
| end-to-end         | 端对端  | link               | 链路     |
| delay              | 时延   | switch             | 交换机    |
| throughput         | 吞吐量  | queuing delay      | 排队时延   |
| loss               | 丢包   | protocol layering  | 协议分层   |
| quantitative model | 定量模型 | Link-layer switch  | 链路层交换机 |
| host               | 主机   | communication link | 通信链路   |
| end system         | 端系统  | packet switch      | 分组交换机  |
|                    |      |                    |        |
|                    |      |                    |        |







A packet switch takes a packet arriving on one of its incoming communication links and forwards that packet on one of its outgoing communication links.

Most prominent types:

- **routers**.(路由器)
- **Link-layer switche**s.(链路层交换机)

​		
Link-layer switches are typically used in access networks, while routers are typically used in the network core.

**Route/path**: (路径)

The sequence of communication links and packet switches traversed by a packet from the sending end system to the receiving end system is known as a route or path through the network.



Packet-switched networks (which transport packets) are in many ways similar to transportation networks of highways, roads, and intersections (which transport vehicles).



**ISP**s (Internet Service Providers, 因特网服务提供商)

- End systems access the Internet through Internet Service Providers.
- Each ISP is in itself a network of packet switches and communication links.
- The internet is all about connecting end systems to each other, so the ISPs that provide access to end systems must also be interconnected.
- These lower-tier ISPs are interconnected through national and international upper-tier ISPs such as Level 3 Communications, AT&T, Sprint, and NTT.
- An upper-tier ISP consists of high-speed routers interconnected with high-speed **fiber-optic link**s (光纤链路). 
- Each ISP network, whether upper-tier or lower-tier, is managed independently, runs the IP protocol, and conforms to certain naming and address conventions.



**Internet protocols**

End systems, packet switches, and other pieces of the Internet run protocols that control the sending and receiving of information within the Internet.

The **Transmission Control Protocol(TCP)** and the **Internet Protocol(IP)** are two of the most important protocols in the internet.

The Internet's principal protocols are collectively known as **TCP/IP**.



**Internet standards**

Internet standards are developed by the Internet Engineering Task Force (**IETF**).

The IETF standards documents are called **requests for comments (RFCs)**. They define protocols such as TCP, IP, HTTP, and SMTP.

Other bodies also specify standards for network components, most notably for network links. The IEEE 802 LAN/MAN Standards Committee, for example, specifies the Ethernet and wireless WiFi standards.



### 1.1.2 a Services Description

We can also describe the Internet from an entirely different angle —— namely, as an **infrastructure** *that provides services to applications*.

These applications include electronic mail, Web surfing, social networks, instant messaging, Voice-over-IP(VoIP), video streaming, distributed games, peer-to-peer(P2P) file shring, television over the Internet, remote login, and much, much more.

The applications are said to be **distributed applications**, since they involve multiple end systems that exchange data with each other.

Importantly, Internet applications run on end systems—they do not run in the packet switches in the network core. Although packet switches facilitate the exchange of data among end systems, they are not concerned with the application that is the source or sink of data.



​		
End systems attached to the Internet provide an *Application Programming Interface (API)* that specifies how a program running on one end system asks the Internet infrastructure to deliver data to a specific destination program running on another end system.

This **Internet API** is a set of rules that the sending program must follow so that the Internet can deliver the data to the destination program.





We have just given two descriptions of the Internet: one in terms of its hardware and software components, the other terms of an infrastructure for providing services to distributed applications.



​		
​		
​	
All activity in the Internet that involves two or more communicating remote entities is governed by a protocol.

- For example, hardware-implemented protocols in two physically connected computers control the flow of bits on the "wire" between the two network interface cards;
- congestion-control protocols in end systems control the rate at which packets are transmitted between sender and receiver; 
- protocols in routers determine a packet’s path from source to destination.

Protocols are running everywhere in the Internet.



When you type the URL of a Web page into your Web browser:

- First, your computer will send a connection request message to the Web server and wait for a reply. 
- The Web server will eventually receive your connection request message and return a connection reply message. 
- Knowing that it is now OK to request the Web document, your computer then sends the name of the Web page it wants to fetch from that Web server in a GET message. 
- Finally, the Web server returns the Web page (file) to your computer.



**Protocol**:

*A protocol defines the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.*



Different protocols are used to accomplish different communication tasks.

Mastering the field of computer networking is equivalent to understanding the what, why, and how of networking protocols.



## 1.2 The Network Edge

The Internet's end systems include desktop computers, servers, and mobile computers. Furthermore, an increasing number of non-traditional devices are being attached to the Internet as end systems.
​					
**End system**s are also referred to as **host**s(主机) because they host (that is, run) applications programs such as a Web browser program, a Web server program, an e-mail client program, or an e-mail server program.

Hosts are sometimes further divided into two categories: **clients** and **servers**.

​		

### 1.2.1 Access Networks

​	




​				
​			
​		
​	


​				
​			
​		
​	



​				
​			
​		
​	


