INSERT INTO forum_categories(category_title, category_description, category_icon, fk_user_id)
VALUES ('Ogłoszenia',
        'Sprawdź tutaj najświeższe ogłoszenia',
        'default',
        (SELECT id FROM sys_users WHERE user_name = 'admin'));

INSERT INTO forum_categories(category_title, category_description, category_icon, fk_user_id)
VALUES ('Ogólna dusyksja',
        'Miejsce, gdzie możesz rozmawiać o czymkolwiek',
        'default',
        (SELECT id FROM sys_users WHERE user_name = 'admin'));

INSERT INTO forum_categories(category_title, category_description, category_icon, fk_user_id)
VALUES ('TopicDao 1',
        'Ant Design, a design language for background applications,is refined by Ant UED Team.',
        'default',
        (SELECT id FROM sys_users WHERE user_name = 'user'));

INSERT INTO forum_categories(category_title, category_description, category_icon, fk_user_id)
VALUES ('TopicDao 2',
        'Ant Design, a design language for background applications,is refined by Ant UED Team.',
        'default',
        (SELECT id FROM sys_users WHERE user_name = 'user'));


INSERT INTO forum_topics(topic_title, fk_category_id, fk_user_id)
VALUES ('Why would somebody use this?', 1, (SELECT id FROM sys_users WHERE user_name = 'admin'));

INSERT INTO forum_topics(topic_title, fk_category_id, fk_user_id)
VALUES ('NodeBB 1.11.0: traffic filtering, navigation improvements and more.', 1,
        (SELECT id FROM sys_users WHERE user_name = 'admin'));

INSERT INTO forum_topics(topic_title, fk_category_id, fk_user_id)
VALUES ('Ant Design Title 3.', 1, (SELECT id FROM sys_users WHERE user_name = 'admin'));

INSERT INTO forum_topics(topic_title, fk_category_id, fk_user_id)
VALUES ('Ant Design Title 4.', 1, (SELECT id FROM sys_users WHERE user_name = 'admin'));


INSERT INTO forum_topics(topic_title, fk_category_id, fk_user_id)
VALUES ('Second topic power.', 2, (SELECT id FROM sys_users WHERE user_name = 'user'));

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<div><div><h2>Welcome to Rengorum</h2></div>' ||
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
        1,
        (SELECT id FROM sys_users WHERE user_name = 'admin'), now());

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<h2>Welcome to Rengorum</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros ' ||
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
        1,
        (SELECT id FROM sys_users WHERE user_name = 'admin'),
        '2019-01-02 00:01:00');


INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<div><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros usertis pellentesque, curabitur tortor ' ||
        'egestas. Ultricies ullamcorper at commodo rhoncus sit pretium leo dolor aenean conubia consequat venenatis. Erat placerat magna praesent dapibus ' ||
        'feugiat per lorem ultrices laoreet a arcu. Habitant aliquet quis non parturient convallis pharetra fringilla phasellus sed orci venenatis lacinia.' ||
        ' Dis litora cubilia quis sit proin proin nisi et hac potenti maecenas. Accumsan, sollicitudin fringilla fermentum. Purus nunc, nisi nunc vehicula ' ||
        'et odio. Enim sollicitudin consequat integer neque, platea id diam suspendisse pulvinar sociis dapibus urna?</p><p>At sed commodo rhoncus nascetur' ||
        ' fames class natoque. Gravida aliquet malesuada nostra litora. Dignissim sapien duis consequat ut tortor porttitor iaculis aliquam erat class. ' ||
        'Consequat congue blandit dignissim eget velit? Egestas litora inceptos ipsum diam proin ultrices conubia penatibus aliquam ac pharetra condimentum.' ||
        ' Litora erat malesuada lacinia fusce, sit vitae semper dis.</p></div>',
        1,
        1,
        (SELECT id FROM sys_users WHERE user_name = 'user'),
        '2019-01-03 00:01:00');

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<p>At sed commodo rhoncus nascetur fames class natoque. Gravida aliquet malesuada nostra litora. Dignissim sapien duis consequat ut tortor ' ||
        'porttitor iaculis aliquam erat class. Consequat congue blandit dignissim eget velit? Egestas litora inceptos ipsum diam proin ultrices conubia' ||
        ' penatibus aliquam ac pharetra condimentum. Litora erat malesuada lacinia fusce, sit vitae semper dis.</p><p>Fringilla volutpat ante, enim aptent' ||
        ' aliquet. Rutrum eget tristique vulputate orci. Cras rutrum blandit quisque sociis ligula. Eu aenean accumsan lacus augue diam odio torquent' ||
        ' platea varius! Tellus sed, odio id placerat nunc venenatis euismod consectetur ante sollicitudin ac malesuada. Vitae mollis suscipit habitasse' ||
        ' fames sed dignissim risus congue scelerisque fusce sollicitudin. Eget varius accumsan aptent eleifend risus.</p><ul><li>Nam vulputate felis felis' ||
        ' lectus sed taciti eros nisi leo.</li><li>Rutrum urna lacus dis class purus semper felis cursus nibh.</li></ul>',
        1,
        1,
        (SELECT id FROM sys_users WHERE user_name = 'admin'),
        '2019-01-04 00:01:00');

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<h2>Welcome to Rengorum</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros ' ||
        'usertis pellentesque, curabitur tortor egestas. Ultricies ullamcorper at commodo rhoncus sit pretium leo dolor aenean conubia consequat venenatis. ' ||
        'Erat placerat magna praesent dapibus feugiat per lorem ultrices laoreet a arcu. Habitant</p>',
        null,
        1,
        (SELECT id FROM sys_users WHERE user_name = 'admin'),
        '2019-01-05 00:01:00');

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<h2>DZIALA</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel </p>',
        2,
        1,
        (SELECT id FROM sys_users WHERE user_name = 'admin'),
        '2019-01-06 00:01:00');

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<h2>Welcome to Rengorum</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros ' ||
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
        2,
        (SELECT id FROM sys_users WHERE user_name = 'admin'),
        '2019-01-02 00:01:00');

INSERT INTO forum_posts(post_content, reply_id, fk_topic_id, fk_user_id, created_at)
VALUES ('<h2>Welcome to Rengorum</h2><p><br></p><p>Tristique fringilla, lacus ante sociosqu. Aliquet vel venenatis pharetra venenatis faucibus eros ' ||
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
        4,
        (SELECT id FROM sys_users WHERE user_name = 'admin'),
        '2019-02-04 00:01:00');
