# HashMap
0. let arr=new Array(16)
1. Imagine your capacity is 16.
You insert 20 items. By bad luck, all 20 items end up colliding and go into index 0 (a long linked list).
The Problem:
A Hash Map becomes slow when the linked lists get too long. Your current logic only resizes if the buckets fill up. But in reality, you need to resize based on the total number of items (keys) stored, regardless of which bucket they are in.

2. If your HashMap grows to contain 1,000,000 items, every time you add item 1,000,001, your code has to loop 1,000,000 times just to check if it needs to resize. This makes your HashMap O(N) (linear time), which defeats the purpose of using a HashMap!

The solution:
Instead of calculating the length manually every time (either via your buckets loop or calling this.length()), you should track the size as you go.

Add a size property to your constructor (initialize it to 0).
When you successfully add a new node in set, increment this.size++. (Be careful not to increment if you are just updating an existing key's value!).
When you successfully remove a node in remove, decrement this.size--.
Update your length() method to simply return this.size.
Track the size

3. if you need a pointer 'p' to track the previous node of the target node 'cur', you may initialize 'p' as null and then assign p to cur everytime before updating cur in the while loop.

4. Don't forget to reset the size when you resize the table or the size will be repetitive!