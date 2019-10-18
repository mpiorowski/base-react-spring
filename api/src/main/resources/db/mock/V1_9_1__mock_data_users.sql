INSERT INTO sys_users(user_name, user_email, user_password, user_roles)
VALUES ('super', 'super@gmail.com', crypt('pass', gen_salt('bf', 8)), ARRAY['ROLE_SUPER', 'ROLE_ADMIN']);

INSERT INTO sys_users(user_name, user_email, user_password, user_roles)
VALUES ('admin', 'admin@gmail.com', crypt('pass', gen_salt('bf', 8)), ARRAY['ROLE_ADMIN']);

INSERT INTO sys_users(user_name, user_email, user_password, user_roles)
VALUES ('user', 'user@gmail.com', crypt('pass', gen_salt('bf', 8)), ARRAY['ROLE_USER']);
