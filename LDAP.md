# LDAP

*LDAP: Lightweight Directory Access Protocol*

- an application protocol for accessing and maintaining distributed *directory information services* over an Internet Protocol network.
- Directory services play an important role in developing intranet and Internet applications by *allowing the sharing of information about users, systems, networks, services, and applications throughout the network*.
- A common use of LDAP is to provide a central place to store usernames and passwords.
  - This allows many different applications and services to connect to the LDAP server to validate users.
- LDAP is based on a simpler subset of the standards contained within the X.500 standard. Because of this relationship, LDAP is sometimes called X.500-lite.

> X.500 : ???



A directory service basically breaks down as follows:

- A directory is a tree of entries
- Every entry has a unique name in the tree
- An entry is a set of attributes.
- An attribute is a key/value(s) pairing (multivalue is natural).

```
              o=example
              /       \
         ou=users     ou=groups
        /      |         |     \
    cn=john  cn=jane    cn=dudes  cn=dudettes
    /
keyid=foo
```

let's look at the record `cn=john`:

```
dn: cn=john, ou=users, o=example
cn: john
sn: smith
email: john@example.com
email: john.smith@example.com
objectClass: person
```

A few things to note:

- All names in a directory tree are actually referred to as a **distinguished name**, or **dn** for short.
  - A dn is comprised of attributes that lead to that node in the tree
  - The root of the tree is at the right of the dn, which is inverted from a filesystem hierarchy.
- Every entry in the tree is an instance of an *objectclass*.
  - An objectclass is a schema concept; think of it like a table in a traditional **ORM**(Object Relational Mapping).
  - An objectclass defines what attributes an entry can have (on the ORM analogy, an attribute would be like a column).

An example from wikipedia:

```
 dn: cn=John Doe,dc=example,dc=com
 cn: John Doe
 givenName: John
 sn: Doe
 telephoneNumber: +1 888 555 6789
 telephoneNumber: +1 888 555 1232
 mail: john@example.com
 manager: cn=Barbara Doe,dc=example,dc=com
 objectClass: inetOrgPerson
 objectClass: organizationalPerson
 objectClass: person
 objectClass: top
```

> - `dn` is the distinguished name of the entry; it is neither an attribute nor a part of the entry.  
>   - "`cn=John Doe` is the entry's RDN (Relative Distinguished Name) 
>   - "`dc=example,dc=com`" is the DN of the parent entry, where "`dc`" denotes '[Domain Component](https://en.wikipedia.org/wiki/Domain_Name_System)' 
> - The other lines show the attributes in the entry.  
>   - Attribute names are typically mnemonic strings, like "`cn`" for common name, "`dc`" for domain component, "`mail`" for e-mail address, and "`sn`" for surname 



> **ORM**: Object-relational mapping (对象关系映射)
>
> - a programming technique for converting data between incompatible type systems using object-oriented programming languages.
> - This creates, in effect, a "virtual object data" that can be used from within the programming language.
> - In [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), [data-management](https://en.wikipedia.org/wiki/Data_management) tasks act on object-oriented (OO) [objects](https://en.wikipedia.org/wiki/Object_(computer_science)) that are almost always non-[scalar](https://en.wikipedia.org/wiki/Scalar_(computing)) values. For example, an address book entry that represents a single person along with zero or more phone numbers and zero or more addresses. This could be modeled in an object-oriented implementation by a "Person [object](https://en.wikipedia.org/wiki/Object_(computer_science))" with [attributes/fields](https://en.wikipedia.org/wiki/Attribute_(computing)) to hold each data item that the entry comprises: the person's name, a list of phone numbers, and a list of addresses. The list of phone numbers would itself contain "PhoneNumber objects" and so on. The address-book entry is treated as a single object by the programming language (it can be referenced by a single variable containing a pointer to the object, for instance). Various methods can be associated with the object, such as a method to return the preferred phone number, the home address, and so on. 
> - However, many popular database products such as [SQL](https://en.wikipedia.org/wiki/SQL) database management systems (DBMS) can only store and manipulate [scalar](https://en.wikipedia.org/wiki/Scalar_(computing)) values such as integers and strings organized within [tables](https://en.wikipedia.org/wiki/Table_(database)). The programmer must either *convert the object values into groups of simpler values for storage in the database (and convert them back upon retrieval)*, or only use simple scalar values within the program. *Object-relational mapping* implements the first approach.
> - The heart of the problem involves *translating the logical representation of the objects into an atomized form that is capable of being stored in the database while preserving the properties of the objects and their relationships so that they can be reloaded as objects when needed.* If this storage and retrieval functionality is implemented, the objects are said to be [persistent](https://en.wikipedia.org/wiki/Persistence_(computer_science)). 





LDAP, is the protocol for interacting with the directory tree, and it's comprehensively specified for common operations, like add/update/delete/search.

- the power of LDAP comes through the *search* operations defined in the protocol, which are richer than HTTP query string filtering, but less powerful than full SQL.
- You can think of LDAP as a NoSQL/document store with a well-defined query syntax.



## Protocol overview

A client starts an LDAP session by connecting to an LDAP server, called a Directory System Agent(DSA), by default on TCP and UDP port `389`, or on port `636` for LDAPS (LDAP over SSL).

- The client then sends an operation request to the server, and the server sends responses in return.
- With some exceptions, the client does not need to wait for a response before sending the next request, and the server may send the responses in any order. All information is transmitted using [Basic Encoding Rules](https://en.wikipedia.org/wiki/Basic_Encoding_Rules) (BER). 

The client may request the following operations:

- StartTLS — use the LDAPv3 [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) extension for a secure connection
- Bind — [authenticate](https://en.wikipedia.org/wiki/Authentication) and specify LDAP protocol version
- Search — search for and/or retrieve directory entries
- Compare — test if a named entry contains a given attribute value
- Add a new entry
- Delete an entry
- Modify an entry
- Modify Distinguished Name (DN) — move or rename an entry
- Abandon — abort a previous request
- Extended Operation — generic operation used to define other operations
- Unbind — close the connection (not the inverse of Bind)





> **DSA**: a Directory System Agent is the elements of a X.500 directory service that provides User Agents with access to a portion of the directory (usually the portion associated with a single *Organizational Unit*).
>
> **OU** : an organizational unit(OU) provides a way of classifying objects located in directories, or names in a digital certificate hierarchy, typically used either to differentiate between objects with the same name (John Doe in OU "marketing" versus John Doe in OU "customer service"), or to parcel out authority to create and manage objects (for example: to give rights for user-creation to local technicians instead of having to manage all accounts from a single central group). 





# ldapjs

Basically, the ldapjs philospohy is to deal with the "muck" of LDAP, and then get out of the way so you can just use the "good parts." 









