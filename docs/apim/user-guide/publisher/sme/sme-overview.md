# Why Service Management Ecosystem?

API Gateways are evolving; the adoption of micro-services to gain
agility and increased pace of innovation has created the need for new
technologies and protocols such as service mesh and gRPC.

The corresponding explosion of data requires the adoption of
Event-Driven Architectures (EDA) and real-time processing capabilities
(such as Apache Kafka) to keep up with the growing need for fast
decision making, while also meeting the expectations of real-time user
experience from service consumers.

Also, the proliferation of IoT devices and the emergence of the latest
generation of mobile network (5g) creates new opportunities for
disruptive business models.

In this context, API Gateways are due to evolve in order to embrace
these modern architectures and technologies that go beyond traditional
HTTP APIs. Gravitee.io Service Management Ecosystem (SME) is designed to
enable you to embrace ever increasing complexities and apply consistent
and effortless governance on top of both traditional and event-driven
APIs.

Service Management Ecosystem (SME) enables you to go beyond REST API and
embrace modern protocols and backend services to future-proof your API
Strategy.

# What is SME?

The SME is composed of a Connector API which provides a framework to
allow for any backend protocol to be proxied through the Gravitee API
Gateway. The Gravitee.io gateway can now be used as a protocol mediation
layer between consumers of service and backend services.

image:{% link images/apim/3.x/api-publisher-guide/sme/what-is-sme.png
%}\[\]

In addition, the SME will also provide a set of connectors implementing
the Connector API in the form of plugins. A plugin consists of a single
unit of code/package that can be deployed onto the platform (e.g Kafka,
HTTP, MQTT, JDBC) giving you the flexibility to only deploy the
connector(s) needed for your use case(s).
