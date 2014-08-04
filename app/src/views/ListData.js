/**
 * Created by lapchan on 5/26/14.
 */
define(function(require, exports, module) {
  module.exports = {
    defaultList : [
      { title : "Item 1", description : "description 1" },
      { title : "Item 2", description : "description 2" },
      { title : "Item 3", description : "description 1" },
      { title : "Item 4", description : "description 2" },
      { title : "Item 5", description : "description 1" },
      { title : "Item 6", description : "description 2" },
      { title : "Item 7", description : "description 1" },
      { title : "Item 8", description : "description 2" },
      { title : "Item 9", description : "description 1" },
      { title : "Item 10", description : "description 2" },
      { title : "Item 11", description : "description 1" },
      { title : "Item 12", description : "description 2" }
    ],
    friendList : [
      { title : "大吉", description : "吃辣别找我！", iconUrl: "/content/images/user1.png", time: "4:45 pm", read: false },
      { title : "Lucy", description : "我最爱吃海鲜了~", iconUrl: "/content/images/user2.png", time: "2:34 pm", read: false },
      { title : "小肥", description : "请我我就去", iconUrl: "content/images/user3.png", time: "12:23 pm", read: true },
      { title : "大喵", description : "寂寞求人吃饭\> \<", iconUrl: "content/images/user4.png", time: "11:43 pm", read: true  },
      { title : "老王", description : "坚决抵制狗肉", iconUrl: "content/images/user5.png", time: "9:32 am", read: true  },
      { title : "吴铭仕", description : "伊斯兰教徒一名，猪肉勿约", iconUrl: "content/images/user6.png", time: "8:12 am", read: true  },
      { title : "梅友人", description : "大胃王，有饭就来！", iconUrl: "content/images/user7.png", time: "3:11 am", read: true  },
    ],
    inboxList : [
      { title : "大吉", description : "明天部门聚餐，过来吃饭", iconUrl: "content/images/user1.png", time: "4:45 pm", read: false },
      { title : "Lucy", description : "美吕，周六晚上一起去太古汇吃个饭？", iconUrl: "content/images/user2.png", time: "2:34 pm", read: false },
      { title : "小肥", description : "你上次点的那家餐厅还不错", iconUrl: "content/images/user3.png", time: "12:23 pm", read: true },
      { title : "大喵", description : "有没有好的日本菜推荐", iconUrl: "content/images/user4.png", time: "11:43 pm", read: true  },
      { title : "老王", description : "好基友，放假好无聊，快请我去吃饭啊", iconUrl: "content/images/user5.png", time: "9:32 am", read: true  },
      { title : "吴铭仕", description : "中午一起去小北门点个菜吧", iconUrl: "content/images/user6.png", time: "8:12 am", read: true  },
      { title : "梅友人", description : "社团招新有点事要商量，晚上找个地方吃饭聊聊呗", iconUrl: "content/images/user7.png", time: "3:11 am", read: true  },
    ],
    productList : [
      { title : "Product 1", description : "description 1" },
      { title : "Product 2", description : "description 2" }
    ],
    filterList : [
      {text: '', imageUrl: 'content/images/invite.png', available: true},
      {text: '', imageUrl: 'content/images/be-invited.png', available: true},
      {text: '', imageUrl: 'content/images/off.png', available: true},

      {text: '', imageUrl: 'content/images/review.png', available: true},
      {text: '', imageUrl: 'content/images/friend.png', available: true},
      {text: '', imageUrl: 'content/images/collection.png', available: false},

      {text: '', imageUrl: 'content/images/history.png', available: true},
      {text: '', imageUrl: 'content/images/control.png', available: true},
      {text: '', imageUrl: 'content/images/group.png', available: true},
    ],
  };
});
