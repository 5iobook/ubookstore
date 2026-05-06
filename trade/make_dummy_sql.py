import random
from datetime import datetime, timedelta

status_list = ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']
method_list = ['DIRECT', 'DELIVERY']
locations = ['서울역', '강남역', '신촌역', '건대입구', '홍대입구']

with open("insert_p_trade.sql", "w", encoding="utf-8") as f:
    f.write("INSERT INTO p_trade (id, buyer_id, seller_id, post_id, status, method, meet_up_location, cancel_reason, completed_at, created_at, updated_at) VALUES\n")
    for i in range(1, 101):
        id = f"b1a1e1a1-{i:04d}-{i:04d}-{i:04d}-{i:012d}"
        buyer = f"c1a1e1a1-{i:04d}-{i:04d}-{i:04d}-{i:012d}"
        seller = f"d1a1e1a1-{i:04d}-{i:04d}-{i:04d}-{i:012d}"
        post = f"e1a1e1a1-{i:04d}-{i:04d}-{i:04d}-{i:012d}"
        status = random.choice(status_list)
        method = random.choice(method_list)
        location = random.choice(locations)
        cancel_reason = "'구매자 변심'" if status == 'CANCELED' else "NULL"
        completed_at = f"'{(datetime.now() - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d %H:%M:%S')}'" if status == 'COMPLETED' else "NULL"
        f.write(f"('{id}', '{buyer}', '{seller}', '{post}', '{status}', '{method}', '{location}', {cancel_reason}, {completed_at}, NOW(), NOW()){',' if i < 100 else ';'}\n")