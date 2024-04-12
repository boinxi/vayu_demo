INSERT INTO groups (name, status) VALUES
('Group Alpha', 'notEmpty'),
('Group Beta', 'notEmpty'),
('Group Gamma', 'notEmpty');

INSERT INTO users (name, email, status, group_id) VALUES
('Amit', 'Amit@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Alpha')),
('Itay', 'Itay@example.com', 'pending', (SELECT id FROM groups WHERE name = 'Group Alpha')),
('Noa', 'Noa@example.com', 'blocked', (SELECT id FROM groups WHERE name = 'Group Beta')),
('Ido', 'Ido@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Beta')),
('Rami', 'Rami@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Gamma')),
('Moshe', 'Moshe@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Beta')),
('Dana', 'Dana@example.com', 'pending', (SELECT id FROM groups WHERE name = 'Group Alpha')),
('Yael', 'Yael@example.com', 'blocked', (SELECT id FROM groups WHERE name = 'Group Alpha')),
('Eitan', 'Eitan@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Beta')),
('Shalom', 'Beta@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Beta')),
('Tal', 'Tal@example.com', 'active', (SELECT id FROM groups WHERE name = 'Group Beta')),
('Yarin', 'Yarin@example.com', 'active', NULL);
