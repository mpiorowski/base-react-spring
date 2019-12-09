-- CATEGORIES
insert into forum_categories(category_title, category_description, category_icon, fk_user_id, created_at)
values ('Ogłoszenia',
        'Sprawdź tutaj najświeższe ogłoszenia',
        'comment',
        (select id from sys_users where user_name = 'admin'), '2019-01-06 00:01:00');

insert into forum_categories(category_title, category_description, category_icon, fk_user_id, created_at)
values ('Ogólna dusyksja',
        'Miejsce, gdzie możesz rozmawiać o czymkolwiek',
        'comment',
        (select id from sys_users where user_name = 'admin'), '2019-01-07 00:01:00');

insert into forum_categories(category_title, category_description, category_icon, fk_user_id, created_at)
values ('TopicDao 1',
        'Ant Design, a design language for background applications,is refined by Ant UED Team.',
        'comment',
        (select id from sys_users where user_name = 'user'), '2019-01-08 00:01:00');

insert into forum_categories(category_title, category_description, category_icon, fk_user_id, created_at)
values ('TopicDao 2',
        'Ant Design, a design language for background applications,is refined by Ant UED Team.',
        'comment',
        (select id from sys_users where user_name = 'user'), '2019-01-09 00:01:00');


-- TOPICS
insert into forum_topics(topic_title, topic_description, fk_category_id, fk_user_id, created_at)
values ('Why would somebody use this?',
        'Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros usertis pellentesque, curabitur tortor egestas.',
        (select id from forum_categories where category_title = 'Ogłoszenia'),
        (select id from sys_users where user_name = 'admin'),
        '2020-01-01 01:00:00');
insert into forum_topics(topic_title, fk_category_id, fk_user_id)
values ('NodeBB 1.11.0: traffic filtering, navigation improvements and more.',
        (select id from forum_categories where category_title = 'Ogłoszenia'),
        (select id from sys_users where user_name = 'admin'));
insert into forum_topics(topic_title, fk_category_id, fk_user_id)
values ('Ant Design Title 3.', (select id from forum_categories where category_title = 'Ogłoszenia'),
        (select id from sys_users where user_name = 'admin'));
insert into forum_topics(topic_title, fk_category_id, fk_user_id)
values ('Ant Design Title 4.', (select id from forum_categories where category_title = 'Ogłoszenia'),
        (select id from sys_users where user_name = 'admin'));
insert into forum_topics(topic_title, fk_category_id, fk_user_id)
values ('Second topic power.', (select id from forum_categories where category_title = 'Ogólna dusyksja'),
        (select id from sys_users where user_name = 'user'));

-- POSTS
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('mock replies',
        null,
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-02 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('mock replies2',
        null,
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-02 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('reply1',
        (select uid from forum_posts where post_content = 'mock replies'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'user'),
        '2019-01-03 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('reply2',
        (select uid from forum_posts where post_content = 'reply1'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'user'),
        '2019-01-03 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('reply3',
        (select uid from forum_posts where post_content = 'reply2'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'user'),
        '2019-01-03 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('test',
        (select uid from forum_posts where post_content = 'mock replies'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-04 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('test',
        (select uid from forum_posts where post_content = 'mock replies'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-05 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('<h2>DZIALA</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel </p>',
        (select uid from forum_posts where post_content = 'mock replies2'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-06 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('test',
        (select uid from forum_posts where post_content = 'mock replies2'),
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-02 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('<h2>Welcome to Rengorum</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros ' ||
        'usertis pellentesque, curabitur tortor egestas. Ultricies ullamcorper at commodo rhoncus sit pretium leo dolor aenean conubia consequat venenatis. ' ||
        'Erat placerat magna praesent dapibus feugiat per lorem ultrices laoreet a arcu. Habitant aliquet quis non parturient convallis pharetra fringilla ' ||
        'phasellus sed orci venenatis lacinia. Dis litora cubilia quis sit proin proin nisi et hac potenti maecenas. Accumsan, sollicitudin fringilla fermentum. ' ||
        'Purus nunc, nisi nunc vehicula et odio. Enim sollicitudin consequat integer neque, platea id diam suspendisse pulvinar sociis dapibus urna?</p><p>At sed ' ||
        'commodo rhoncus nascetur fames class natoque. Gravida aliquet malesuada nostra litora. Dignissim sapien duis consequat ut tortor porttitor iaculis aliquam ' ||
        'erat class. Consequat congue blandit dignissim eget velit? Egestas litora inceptos ipsum diam proin ultrices conubia penatibus aliquam ac pharetra ' ||
        'condimentum. Litora erat malesuada lacinia fusce, sit vitae semper dis.</p><p>Fringilla volutpat ante, enim aptent aliquet. Rutrum eget tristique v' ||
        'ulputate orci. Cras rutrum blandit quisque sociis ligula. Eu aenean accumsan lacus augue diam odio torquent platea varius! Tellus sed, odio id placerat ' ||
        'nunc venenatis euismod consectetur ante sollicitudin ac malesuada. Vitae mollis suscipit habitasse fames sed dignissim risus congue scelerisque fus' ||
        'ce sollicitudin. Eget varius accumsan aptent eleifend risus.</p><p><br></p><ul><li>Nam vulputate felis felis lectus sed taciti eros nisi leo.</li>' ||
        '<li>Rutrum urna lacus dis class purus semper felis cursus nibh.</li><li>Hendrerit penatibus interdum torquent posuere himenaeos nec facilisi ornare ' ||
        'fusce.</li><li>Primis interdum ac tortor magna torquent proin facilisi magna nulla.</li></ul><p><br></p><p>Enjoy :)</p><p><br></p>',
        null,
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'),
        '2019-02-04 00:01:00');

insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('<div><div><h2>Welcome to Rengorum</h2></div>' ||
        '<p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros usertis pellentesque, ' ||
        'curabitur tortor egestas. Ultricies ullamcorper at commodo rhoncus sit pretium leo dolor aenean conubia consequat venenatis. ' ||
        'Erat placerat magna praesent dapibus feugiat per lorem ultrices laoreet a arcu. Habitant aliquet quis non parturient convallis ' ||
        'pharetra fringilla phasellus sed orci venenatis lacinia. Dis litora cubilia quis sit proin proin nisi et hac potenti maecenas. ' ||
        'Accumsan, sollicitudin fringilla fermentum. Purus nunc, nisi nunc vehicula et odio. Enim sollicitudin consequat integer neque, ' ||
        'platea id diam suspendisse pulvinar sociis dapibus urna?</p><p>At sed commodo rhoncus nascetur fames class natoque. ' ||
        'Gravida aliquet malesuada nostra litora. Dignissim sapien duis consequat ut tortor porttitor iaculis aliquam erat class. ' ||
        'Consequat congue blandit dignissim eget velit? Egestas litora inceptos ipsum diam proin ultrices conubia penatibus aliquam ' ||
        'ac pharetra condimentum. Litora erat malesuada lacinia fusce, sit vitae semper dis.</p><p>Fringilla volutpat ante, ' ||
        'enim aptent aliquet. Rutrum eget tristique vulputate orci. Cras rutrum blandit quisque sociis ligula. ' ||
        'Eu aenean accumsan lacus augue diam odio torquent platea varius! Tellus sed, odio id placerat nunc venenatis ' ||
        'euismod consectetur ante sollicitudin ac malesuada. Vitae mollis suscipit habitasse fames sed dignissim risus ' ||
        'congue scelerisque fusce sollicitudin. Eget varius accumsan aptent eleifend risus.</p>' ||
        '<ul><li>Nam vulputate felis felis lectus sed taciti eros nisi leo.</li>' ||
        '<li>Rutrum urna lacus dis class purus semper felis cursus nibh.</li>' ||
        '<li>Hendrerit penatibus interdum torquent posuere himenaeos nec facilisi ornare fusce.</li>' ||
        '<li>Primis interdum ac tortor magna torquent proin facilisi magna nulla.</li></ul>Enjoy :)</div>',
        null,
        (select id from forum_topics where topic_title = 'Why would somebody use this?'),
        (select id from sys_users where user_name = 'admin'), now());

insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('mock',
        null,
        (select id from forum_topics where topic_title = 'Ant Design Title 3.'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-01 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('mock',
        null,
        (select id from forum_topics where topic_title = 'Ant Design Title 4.'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-01 00:01:00');
insert into forum_posts(post_content, reply_uid, fk_topic_id, fk_user_id, created_at)
values ('mock',
        null,
        (select id from forum_topics where topic_title = 'NodeBB 1.11.0: traffic filtering, navigation improvements and more.'),
        (select id from sys_users where user_name = 'admin'),
        '2019-01-01 00:01:00');
