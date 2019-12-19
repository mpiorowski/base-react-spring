insert into sys_users(user_name, user_email, user_password, user_roles)
values ('super', 'super@gmail.com', crypt('pass', gen_salt('bf', 8)), array['ROLE_SUPER', 'ROLE_ADMIN']);

insert into sys_users(user_name, user_email, user_password, user_roles)
values ('admin', 'admin@gmail.com', crypt('pass', gen_salt('bf', 8)), array['ROLE_ADMIN', 'ROLE_USER']);
