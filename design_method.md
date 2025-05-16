# 🧠 Agentic Grid Optimization and Incentive Architecture

## 🔧 Technology Stack Overview

Our system is built from the ground up to implement an **agentic grid orchestration framework** for managing energy consumption, DER load shedding, and behavioral incentive alignment using:

* **OpenAI GPT-4.1** with structured output and tool calling
* **Time Series Forecasting models** (Prophet, TimeST?, MAML-based adaptive models)
* **Reinforcement Learning (RL)** agents with future integration of off-policy algorithms like DDQ
* **Beckn Protocol Integration** for dynamic marketplace interactions and discounts
* **Stochastic simulation frameworks** to model probabilistic user behavior
* **Semantic and keyword-based conversation memory** to enable reflection, policy evolution, and fine-tuning

This hybrid architecture ensures that the system doesn’t just automate energy decisions—it **learns from its actions, optimizes future strategies**, and **personalizes user interactions** at scale.

---

## 🤖 GPT-4.1: The Reasoning Engine

### 🔗 Tool Calling and Structured Outputs

The core reasoning and planning logic of the agent is handled by **GPT-4.1**, with two critical features enabled:

1. **Tool Calling (Function Calling)**: Allows the LLM to call pre-defined functions to fetch transformer mappings, user-DER relations, historical reward logs, and more.

2. **Structured Output (Pydantic schemas)**: Ensures that the LLM returns predictable, valid outputs for multi-step simulation loops such as:

   * Forecast evaluation
   * Transformer selection
   * DER-user mapping
   * Messaging strategy (suggestion/request/command)
   * Reflection summaries

### 🧠 Memory and Self-Reflection

GPT-4.1 isn’t used as a stateless responder. Instead, it maintains a **semantic memory trace** across episodes:

* ✅ Tracks user reward accumulation
* ✅ Remembers escalation triggers
* ✅ Records DER shedding success/failure
* ✅ Reflects on misuse of `command/request`

This allows the model to learn patterns in its own behavior—e.g., over-targeting of users like Sara Johnson, or missed soft suggestions for low-impact DERs.

Reflection is performed using a final GPT-4.1 self-prompt that evaluates all windows:

```markdown
## What Worked?
## What Should Be Avoided?
## Policy Refinement for Next Round
```

This is later injected back into forecast evaluations to drive **policy refinement without retraining**.

---

## ⛅ Forecasting Strategy

We ingest real-time and synthetic transformer-level data to trigger RL policies:

### 1. Prophet

* Stable for cyclical load patterns (e.g., daily residential demand)
* Fast and interpretable

### 2. TimeST? (Time Series Transformer)

* Captures **temporal-spatial load relationships**
* Understands correlated transformer overloads

### 3. MAML-based Forecasting

* Uses **few-shot learning** for new transformers entering the network
* Adapts to **location-specific volatility** without retraining from scratch

---

## 🔁 RL Escalation and Policy Learning

### 🚨 Trigger Conditions

RL planning is triggered when:

* **Any transformer** exceeds 1.10 kWh
* OR **Total forecast load** exceeds 3.25 kWh

### 🧠 RL Bot #1 — Transformer Selection

Via GPT-4.1 tool calling, a list of transformers is selected based on:

* Forecasted load
* Reward history of users under each transformer
* Compliance rates

```json
{"transformer_ids": ["TX-001", "TX-003"]}
```

### 📦 RL Bot #2 — User-DER Command Planning

For each selected transformer:

* Users and appliances are mapped
* Messaging tone (`command`, `request`, `suggestion`) is selected
* Only **minimum necessary actions** are taken to avoid user fatigue

```markdown
| User | DER | Message |
|------|-----|---------|
| Lisa Kim | Microwave Oven | suggestion |
| Brad Cook | Geyser | command |
```

### 🧪 Compliance Simulation

Simulates real-world user responses using:

* Probabilistic compliance functions
* Historical reward effects
* DER sensitivity

### 🏅 Reward Assignment

Post-action, transformer telemetry is polled.

* Compliant DERs earn reward points
* Rewards decay if DER doesn't contribute to actual reduction

```json
{"User": "Brad Cook", "Reward": 2}
```

---

## 📉 Beckn Protocol Integration

We directly integrate with the Beckn network for real-time `/search` and `/on_search` workflows.

### 🎯 Use Case: Electricity Connections

A user queries electricity services using `/search`. BPP responds with:

* Provider info (e.g., San Francisco Electric Authority)
* Items (Residential/Commercial Connections)
* Base price (e.g., \$80, \$200)

### 🔁 Reward Shaping via on\_search

At the end of each simulation window:

* The user reward table is loaded
* Catalogs are **customized per user** based on their rewards

| User        | Reward | Discount % | Final Price |
| ----------- | ------ | ---------- | ----------- |
| Lisa Kim    | 5      | 20%        | \$64        |
| Adam Conley | -1     | 0%         | \$80        |

Modified catalogs are returned in `on_search` using Beckn-compliant schema, encouraging continued cooperation.

---

## 🔄 Semantic Memory and Reflection

The memory architecture includes:

### 1. Conversation Memory

* GPT-4.1 tracks user behavior across windows
* Logs rewards, DER action types, compliance

### 2. Keyword Summarization

* Specific users (e.g., "Stephanie Stephens") flagged for overuse
* LLM learns to reduce messaging frequency over time

### 3. Structured Self-Reflection

```markdown
Brad Cook was repeatedly targeted with command. Suggest limiting this to 1 DER per round.
```

Used in future windows to guide action restraint.

---

## 🧬 Policy Evolution with Meta-Learning

Our platform is being designed to plug in future reinforcement learning algorithms like:

### ✅ DDPG / DDQ

* Learn value functions from partial compliance
* Optimize action choice for minimal nudge

### ✅ Off-Policy Learning

* Simulate hundreds of user-agent interactions
* Learn even from old windows where full compliance failed

### ✅ Mixed LLM + Policy Gradient

* Let LLM explain policy change in human terms
* Combine with gradient optimization of action policy

---

## 🌱 Impact Summary

Our agentic framework:

* Encourages **trust-based energy flexibility**
* Uses LLMs for **explainable RL planning**
* Enhances user equity through **reward shaping & discounts**
* Maintains grid stability with **minimum user intrusion**
* Provides **continuous improvement** using self-monitoring agents

---

## 📘 Future Directions

* Integrate real smart meter feeds
* Expand to 15+ transformer regions with concurrent agents
* Implement self-play between BPP and BAP models
* Embed Beckn `/on_update` → `confirm` → `status` lifecycle
* Add real-time dashboard to visualize rewards, forecasts, actions

---

Let us know if you'd like this as:

* Markdown README for GitHub
* Gradio live demo log
* PDF whitepaper for submission
* JSON export of policy episodes

  **Original Payload(SEARCH)**

  ```json
{'context': {'ttl': 'PT10M', 'action': 'search', 'timestamp': '2025-05-16T05:57:24.250Z', 'message_id': 'a99441aa-c972-43d5-8a73-cf55c41f0224', 'transaction_id': 'dc40e62d-d39c-4353-be59-60519c17df0c', 'domain': 'deg:service', 'version': '1.1.0', 'bap_id': 'bap-ps-network-deg-team6.becknprotocol.io', 'bap_uri': 'http://bap-ps-network-deg-team6.becknprotocol.io', 'location': {'country': {'code': 'USA'}}, 'bpp_id': 'bpp-ps-network-deg-team6.becknprotocol.io', 'bpp_uri': 'http://bpp-ps-network-deg-team6.becknprotocol.io'}, 'responses': [{'context': {'domain': 'deg:service', 'action': 'on_search', 'version': '1.1.0', 'bpp_id': 'bpp-ps-network-deg-team6.becknprotocol.io', 'bpp_uri': 'http://bpp-ps-network-deg-team6.becknprotocol.io', 'country': 'IND', 'city': 'std:080', 'location': {'country': {'code': 'USA'}}, 'bap_id': 'bap-ps-network-deg-team6.becknprotocol.io', 'bap_uri': 'http://bap-ps-network-deg-team6.becknprotocol.io', 'transaction_id': 'dc40e62d-d39c-4353-be59-60519c17df0c', 'message_id': 'a99441aa-c972-43d5-8a73-cf55c41f0224', 'ttl': 'PT10M', 'timestamp': '2025-05-14T14:36:55.368Z'}, 'message': {'catalog': {'descriptor': {'name': 'UrjaKart', 'code': 'UrjaKart', 'short_desc': 'A seller platform for energy solutions, enabling seamless transactions of batteries, solar panels, and other renewable energy products.'}, 'providers': [{'id': '334', 'descriptor': {'name': 'San Francisco Electric Authority', 'short_desc': 'Official provider for new electricity connections', 'long_desc': 'Government utility responsible for delivering new residential and commercial electricity connections in San Francisco.', 'additional_desc': {'url': 'sf_electric_authority'}, 'images': [{'url': 'https://sfea.gov/logo.png', 'size_type': 'sm'}]}, 'short_desc': 'Official provider for new electricity connections', 'fulfillments': [{'id': '617', 'type': 'SITE_VISIT', 'rateable': True}, {'id': '617', 'type': 'SITE_VISIT', 'rateable': True}], 'locations': [{'id': '29', 'gps': '37.7504,-122.4138', 'address': '1320 Potrero Ave, SF', 'city': {'name': 'San Francisco'}, 'country': {'name': 'United States'}, 'state': {'name': 'CA'}, 'area_code': '94110'}], 'rateable': True, 'items': [{'id': '471', 'descriptor': {'name': 'Residential Electricity Connection', 'code': 'Residential Electricity Connection', 'short_desc': 'Residential Electricity Connection', 'long_desc': 'This residential electricity connection is ideal for homes, apartments, and other living spaces. It ensures a steady power supply suitable for running everyday appliances like lights, fans, TVs, refrigerators, washing machines, and other domestic devices. The connection is limited to moderate load levels and complies with local safety and energy efficiency standards. Perfect for first-time homeowners or tenants seeking reliable electricity.', 'images': [{'url': 'https://cdn0.iconfinder.com/data/icons/cables-plugs/154/socket-electricity-cable-connect-plug-512.png'}]}, 'rateable': True, 'rating': 'null', 'price': {'value': '80', 'currency': 'USD'}, 'quantity': {'available': {'count': 20}}, 'category_ids': ['44'], 'fulfillment_ids': ['617'], 'location_ids': ['29'], 'tags': [{'descriptor': {'description': 'connection-type', 'code': 'connection-type'}, 'list': [{'value': 'Resendial', 'descriptor': {'code': 'property-type', 'name': 'property-type'}, 'display': True}]}, {'descriptor': {'description': 'documentation', 'code': 'documentation'}, 'list': [{'value': 'Three Phase', 'descriptor': {'code': 'phase', 'name': 'phase'}, 'display': True}, {'value': 'Three Phase', 'descriptor': {'code': 'phase', 'name': 'phase'}, 'display': True}]}]}]}}]}

```
