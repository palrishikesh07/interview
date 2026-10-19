name = "Rishi"
age = 20
active = True
print("Name:", name)
print("Age:", age)
print("Active:", active)
print("Type of name:", type(name))
print("Type of age:", type(age))
print("Type of active:", type(active))

#Lists and dictionaries

users = ["Rishi","Rahul","Riya","Priya"];
print(users[0])

users.append("Nikita");
print(users)

users[0]="Raj"
print(users)

#dictionaries

userDict = {
    "id":1,
    "name":"raj",
    "active":True
}

print(userDict["name"])
print(userDict.get("email")); # None

# Interview question: What is the difference between a list and a tuple?
# - A list is mutable, so you can add, remove, or update elements.
# - A tuple is immutable, so its elements cannot be reassigned after creation.

skills = ["Python","FastAPI"]
skills.append("SQL")

print(skills)

# tuple
coordinates=(10,20)

# function
def add(a:int, b:int)->int:
    return a+b

result = add(10,20)
print(result)

# Default argument
def greet(name: str = "Developer")->str:
    return f"Hello ,{name}"

print(greet())
print(greet("Raj"))


# Exception handling

def divide(a:float, b: float)->float:
    try:
        return a/b
    except ZeroDivisonError:
        raise ValueError("Denominator cannot be zero")

