import imgURL from './images/5.png';

const ChatList = [
    {
      id: 0,
      img: imgURL,
      name: 'David Freeman',
      msg: 'How are you?',
      time: "9:36",
      unread: 0,
      pinned: true,
      online: true,
    },
    {
      id: 1,
      img: imgURL,
      name: 'Shoval Liel',
      msg: 'Hi',
      time: "12:02",
      unread: 2,
      pinned: true,
      online: false,
    },
    {
      id: 2,
      img: imgURL,
      name: 'Alex Comeford',
      msg: 'Era???',
      time: "10:35",
      unread: 3,
      pinned: false,
      online: true,
    },
    {
      id: 3,
      img: imgURL,
      name: 'Adi Biti',
      msg: 'What\'s going on?',
      time: "04:00",
      unread: 0,
      pinned: false,
      online: true,
    },
    {
      id: 4,
      img: imgURL,
      name: 'Ein Alecha',
      msg: 'Ata hagadol miculam',
      time: "08:42",
      unread: 0,
      pinned: false,
      online: false,
    },
    {
      id: 5,
      img: imgURL,
      name: 'Oiy Kapara',
      msg: 'Somthing went wrong',
      time: "08:42",
      unread: 0,
      pinned: false,
      online: false,
    },
    {
      id: 6,
      img: imgURL,
      name: 'Bumble Bee',
      msg: 'Hopa po ze lo Airopa',
      time: "08:42",
      unread: 0,
      pinned: false,
      online: false,
    },
    {
      id: 7,
      img: imgURL,
      name: 'Edmond Malul',
      msg: 'Bla bla bla',
      time: "08:42",
      unread: 0,
      pinned: false,
      online: false,
    },
  ];

  const Chat_History = [
    {
      type: "msg",
      message: "Hi 👋🏻, How are ya ?",
      incoming: true,
      outgoing: false,
    },
    {
      type: "divider",
      text: "Today",
    },
    {
      type: "msg",
      message: "Hi 👋 Panda, not bad, u ?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      message: "Can you send me an abstarct image?",
      incoming: false,
      outgoing: true,
    },
    {
      type: "msg",
      message: "Ya sure, sending you a pic",
      incoming: true,
      outgoing: false,
    },
  
    {
      type: "msg",
      subtype: "img",
      message: "Here You Go",
      img: imgURL,
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      message: "Can you please send this in file format?",
      incoming: false,
      outgoing: true,
    },
  
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "reply",
      reply: "This is a reply",
      message: "Yep, I can also do that",
      incoming: false,
      outgoing: true,
    },
  ];
  
  const Message_options = [
    {
      title: "Reply",
    },
    {
      title: "React to message",
    },
    {
      title: "Forward message",
    },
    {
      title: "Star message",
    },
    {
      title: "Report",
    },
    {
      title: "Delete Message",
    },
  ];
  
  const Shared_docs = [
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "doc",
      message: "Yes sure, here you go.",
      incoming: true,
      outgoing: false,
    },
  ];
  
  const Shared_links = [
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
    {
      type: "msg",
      subtype: "link",
      preview: imgURL,
      message: "Yep, I can also do that",
      incoming: true,
      outgoing: false,
    },
  ];

  export {
    ChatList,
    Chat_History,
    Message_options,
    Shared_links,
    Shared_docs,
  };