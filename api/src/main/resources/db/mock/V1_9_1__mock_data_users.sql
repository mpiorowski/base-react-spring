insert into sys_users(user_name, user_email, user_password, user_roles)
values ('user', 'user@gmail.com', crypt('pass', gen_salt('bf', 8)), array['ROLE_USER']);

insert into sys_users(user_name, user_email, user_password, user_roles)
values ('user1', 'user1@gmail.com', crypt('pass', gen_salt('bf', 8)), array['ROLE_USER']);
