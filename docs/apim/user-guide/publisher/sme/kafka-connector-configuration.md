# Configuring Kafka Connector

## Consumer

**groupId**

A unique string that identifies the consumer group this consumer belongs
to. This property is required if the consumer uses either the group
management functionality by using subscribe(topic) or the Kafka-based
offset management strategy.

**groupInstanceId**

A unique identifier of the consumer instance provided by the end user.
Only non-empty strings are permitted. If set, the consumer is treated as
a static member, which means that only one instance with this ID is
allowed in the consumer group at any time. This can be used in
combination with a larger session timeout to avoid group rebalances
caused by transient unavailability (e.g. process restarts). If not set,
the consumer will join the group as a dynamic member, which is the
traditional behavior.

**sessionTimeoutMs**

The timeout used to detect client failures when using Kafka’s group
management facility. The client sends periodic heartbeats to indicate
its liveness to the broker. If no heartbeats are received by the broker
before the expiration of this session timeout, then the broker will
remove this client from the group and initiate a rebalance. Note that
the value must be in the allowable range as configured in the broker
configuration by group.min.session.timeout.ms and
group.max.session.timeout.ms.

          "default": 10000

**heartbeatIntervalMs**

The expected time between heartbeats to the consumer coordinator when
using Kafka’s group management facilities. Heartbeats are used to ensure
that the consumer’s session stays active and to facilitate rebalancing
when new consumers join or leave the group. The value must be set lower
than session.timeout.ms, but typically should be set no higher than 1/3
of that value. It can be adjusted even lower to control the expected
time for normal rebalances.

          "default": 3000

**partitionAssignmentStrategy**

A list of class names or class types, ordered by preference, of
supported partition assignment strategies that the client will use to
distribute partition ownership amongst consumer instances when group
management is used.In addition to the default class specified below, you
can use the org.apache.kafka.clients.consumer.RoundRobinAssignorclass
for round robin assignments of partitions to consumers. Implementing the
org.apache.kafka.clients.consumer.ConsumerPartitionAssignor interface
allows you to plug in a custom assignmentstrategy.

          "default": "org.apache.kafka.clients.consumer.RangeAssignor"

**metadataMaxAgeMs**

The period of time in milliseconds after which we force a refresh of
metadata even if we haven’t seen any partition leadership changes to
proactively discover any new brokers or partitions.

          "default": 300000,
          "minimum": 0

**enableAutoCommit**

If true the consumer’s offset will be periodically committed in the
background.

          "default": true

**autoCommitIntervalMs**

The frequency in milliseconds that the consumer offsets are
auto-committed to Kafka if enable.auto.commit is set to true.

          "default": 5000,
          "minimum": 0

**clientId**

An id string to pass to the server when making requests. The purpose of
this is to be able to track the source of requests beyond just ip/port
by allowing a logical application name to be included in server-side
request logging.

          "default": ""

**clientRack**

A rack identifier for this client. This can be any string value which
indicates where this client is physically located. It corresponds with
the broker config *broker.rack*

          "default": ""

**maxPartitionFetchBytes**

The maximum amount of data per-partition the server will return. Records
are fetched in batches by the consumer. If the first record batch in the
first non-empty partition of the fetch is larger than this limit, the
batch will still be returned to ensure that the consumer can make
progress. The maximum record batch size accepted by the broker is
defined via message.max.bytes (broker config) or max.message.bytes
(topic config). See fetch.max.bytes for limiting the consumer request
size.

          "default": 1048576,
          "minimum": 0

**sendBufferBytes**

The size of the TCP send buffer (SO\_SNDBUF) to use when sending data.
If the value is -1, the OS default will be used.

          "default": 131072,
          "minimum": -1

**receiveBufferBytes**

The size of the TCP receive buffer (SO\_RCVBUF) to use when reading
data. If the value is -1, the OS default will be used.

          "default": 65536,
          "minimum": -1

**fetchMinBytes**

The minimum amount of data the server should return for a fetch request.
If insufficient data is available the request will wait for that much
data to accumulate before answering the request. The default setting of
1 byte means that fetch requests are answered as soon as a single byte
of data is available or the fetch request times out waiting for data to
arrive. Setting this to something greater than 1 will cause the server
to wait for larger amounts of data to accumulate which can improve
server throughput a bit at the cost of some additional latency.

          "default": 1,
          "minimum": 0

**fetchMaxBytes**

The maximum amount of data the server should return for a fetch request.
Records are fetched in batches by the consumer, and if the first record
batch in the first non-empty partition of the fetch is larger than this
value, the record batch will still be returned to ensure that the
consumer can make progress. As such, this is not a absolute maximum. The
maximum record batch size accepted by the broker is defined via
message.max.bytes (broker config) or max.message.bytes (topic config).
Note that the consumer performs multiple fetches in parallel.

          "default": 52428800,
          "minimum": 0

**fetchMaxWaitMs**

The maximum amount of time the server will block before answering the
fetch request if there isn’t sufficient data to immediately satisfy the
requirement given by fetch.min.bytes.

          "default": 500,
          "minimum": 0

**reconnectBackoffMs**

The base amount of time to wait before attempting to reconnect to a
given host. This avoids repeatedly connecting to a host in a tight loop.
This backoff applies to all connection attempts by the client to a
broker.

          "default": 50,
          "minimum": 0

**reconnectBackoffMaxMs**

The maximum amount of time in milliseconds to wait when reconnecting to
a broker that has repeatedly failed to connect. If provided, the backoff
per host will increase exponentially for each consecutive connection
failure, up to this maximum. After calculating the backoff increase, 20%
random jitter is added to avoid connection storms.

          "default": 1000,
          "minimum": 0

**retryBackoffMs**

The amount of time to wait before attempting to retry a failed request
to a given topic partition. This avoids repeatedly sending requests in a
tight loop under some failure scenarios.

          "default": 100,
          "minimum": 0

**autoOffsetReset**

What to do when there is no initial offset in Kafka or if the current
offset does not exist any more on the server (e.g. because that data has
been deleted): earliest: automatically reset the offset to the earliest
offsetlatest: automatically reset the offset to the latest offsetnone:
throw exception to the consumer if no previous offset is found for the
consumer’s groupanything else: throw exception to the consumer.

          "default": "latest
          "enum": [
            "latest
            "earliest
            "none"
          ]

**checkCRCS**

Automatically check the CRC32 of the records consumed. This ensures no
on-the-wire or on-disk corruption to the messages occurred. This check
adds some overhead, so it may be disabled in cases seeking extreme
performance.

          "default": true

**metricsSampleWindowMs**

The window of time a metrics sample is computed over.

          "default": 30000,
          "minimum": 0

**metricsNumSamples**

The number of samples maintained to compute metrics.

          "default": 2,
          "minimum": 1

**metricsRecordingLevel**

The highest recording level for metrics.

          "default": "INFO
          "enum": [
            "INFO
            "DEBUG"
          ]

**metricReporters**

A list of classes to use as metrics reporters. Implementing the
org.apache.kafka.common.metrics.MetricsReporter interface allows
plugging in classes that will be notified of new metric creation. The
JmxReporter is always included to register JMX statistics.

**keyDeserializer**

Deserializer class for key that implements the
org.apache.kafka.common.serialization.Deserializer interface.

          "default": "org.apache.kafka.common.serialization.StringDeserializer"

**valueDeserializer**

Deserializer class for value that implements the
org.apache.kafka.common.serialization.Deserializer interface.

          "default": "org.apache.kafka.common.serialization.StringDeserializer"

**requestTimeoutMs**

The configuration controls the maximum amount of time the client will
wait for the response of a request. If the response is not received
before the timeout elapses the client will resend the request if
necessary or fail the request if retries are exhausted.

          "default": 30000,
          "minimum": 0

**defaultApiTimeoutMs**

Specifies the timeout (in milliseconds) for client APIs. This
configuration is used as the default timeout for all client operations
that do not specify a timeout parameter.

          "default": 60000,
          "minimum": 0

**connectionsMaxIdleMs**

Close idle connections after the number of milliseconds specified by
this config.

          "default": 540000

**interceptorClasses**

A list of classes to use as interceptors. Implementing the
org.apache.kafka.clients.consumer.ConsumerInterceptor interface allows
you to intercept (and possibly mutate) records received by the consumer.
By default, there are no interceptors.

**maxPollRecords**

The maximum number of records returned in a single call to poll().

          "default": 500,
          "minimum": 1

**maxPollIntervalMs**

The maximum delay between invocations of poll() when using consumer
group management. This places an upper bound on the amount of time that
the consumer can be idle before fetching more records. If poll() is not
called before expiration of this timeout, then the consumer is
considered failed and the group will rebalance in order to reassign the
partitions to another member. For consumers using a non-null
group.instance.id which reach this timeout, partitions will not be
immediately reassigned. Instead, the consumer will stop sending
heartbeats and partitions will be reassigned after expiration of
session.timeout.ms. This mirrors the behavior of a static consumer which
has shutdown.

          "default": 300000,
          "minimum": 1

**excludeInternalTopics**

Whether internal topics matching a subscribed pattern should be excluded
from the subscription. It is always possible to explicitly subscribe to
an internal topic.

          "default": true

**isolationLevel**

Controls how to read messages written transactionally. If set to
read\_committed, consumer.poll() will only return transactional messages
which have been committed. If set to read\_uncommitted' (the default),
consumer.poll() will return all messages, even transactional messages
which have been aborted. Non-transactional messages will be returned
unconditionally in either mode. Messages will always be returned in
offset order. Hence, in read\_committed mode, consumer.poll() will only
return messages up to the last stable offset (LSO), which is the one
less than the offset of the first open transaction. In particular any
messages appearing after messages belonging to ongoing transactions will
be withheld until the relevant transaction has been completed. As a
result, read\_committed consumers will not be able to read up to the
high watermark when there are in flight transactions. Further, when in
read\_committed the seekToEnd method will return the LSO

          "default": "READ_UNCOMMITTED
          "enum": [
            "READ_COMMITTED
            "READ_UNCOMMITTED"
          ]

**allowAutoCreateTopics**

Allow automatic topic creation on the broker when subscribing to or
assigning a topic. A topic being subscribed to will be automatically
created only if the broker allows for it using
`auto.create.topics.enable` broker configuration. This configuration
must be set to `false` when using brokers older than 0.11.0

          "default": true

**securityProviders**

A list of configurable creator classes each returning a provider
implementing security algorithms. These classes should implement the
org.apache.kafka.common.security.auth.SecurityProviderCreator interface.

**securityProtocol**

Protocol used to communicate with brokers.

          "default": "PLAINTEXT
          "enum": [
            "PLAINTEXT
            "SSL
            "SASL_PLAINTEXT
            "SASL_SSL"
          ]
        }
      "x-schema-form": {
        "open": false
      }

## Producer

**bufferMemory**

The total bytes of memory the producer can use to buffer records waiting
to be sent to the server. If records are sent faster than they can be
delivered to the server the producer will block for max.block.ms after
which it will throw an exception.This setting should correspond roughly
to the total memory the producer will use, but is not a hard bound since
not all memory the producer uses is used for buffering. Some additional
memory will be used for compression (if compression is enabled) as well
as for maintaining in-flight requests.

          "default": 33554432,
          "minimum": 0

**retries**

Setting a value greater than zero will cause the client to resend any
record whose send fails with a potentially transient error. Note that
this retry is no different than if the client resent the record upon
receiving the error. Allowing retries without setting
max.in.flight.requests.per.connection to 1 will potentially change the
ordering of records because if two batches are sent to a single
partition, and the first fails and is retried but the second succeeds,
then the records in the second batch may appear first. Note additionally
that produce requests will be failed before the number of retries has
been exhausted if the timeout configured by delivery.timeout.ms expires
first before successful acknowledgement. Users should generally prefer
to leave this config unset and instead use delivery.timeout.ms to
control retry behavior.

          "default": 2147483647,
          "minimum": 0,
          "maximum": 2147483647

**acks**

The number of acknowledgments the producer requires the leader to have
received before considering a request complete. This controls the
durability of records that are sent. The following settings are allowed:
acks=0 If set to zero then the producer will not wait for any
acknowledgment from the server at all. The record will be immediately
added to the socket buffer and considered sent. No guarantee can be made
that the server has received the record in this case, and the retries
configuration will not take effect (as the client won’t generally know
of any failures). The offset given back for each record will always be
set to -1. acks=1 This will mean the leader will write the record to its
local log but will respond without awaiting full acknowledgement from
all followers. In this case should the leader fail immediately after
acknowledging the record but before the followers have replicated it
then the record will be lost. acks=all This means the leader will wait
for the full set of in-sync replicas to acknowledge the record. This
guarantees that the record will not be lost as long as at least one
in-sync replica remains alive. This is the strongest available
guarantee. This is equivalent to the acks=-1 setting.

          "default": "1
          "enum": [
            "all
            "-1
            "0
            "1"
          ]

**compressionType**

The compression type for all data generated by the producer. The default
is none (i.e. no compression). Valid values are none, gzip, snappy, lz4,
or zstd. Compression is of full batches of data, so the efficacy of
batching will also impact the compression ratio (more batching means
better compression).

          "default": "none
          "enum": [
            "none
            "gzip
            "snappy
            "lz4
            "zstd"
          ]

**batchSize**

The producer will attempt to batch records together into fewer requests
whenever multiple records are being sent to the same partition. This
helps performance on both the client and the server. This configuration
controls the default batch size in bytes. No attempt will be made to
batch records larger than this size. Requests sent to brokers will
contain multiple batches, one for each partition with data available to
be sent. A small batch size will make batching less common and may
reduce throughput (a batch size of zero will disable batching entirely).
A very large batch size may use memory a bit more wastefully as we will
always allocate a buffer of the specified batch size in anticipation of
additional records.

          "default": 16384,
          "minimum": 0

**lingerMs**

The producer groups together any records that arrive in between request
transmissions into a single batched request. Normally this occurs only
under load when records arrive faster than they can be sent out. However
in some circumstances the client may want to reduce the number of
requests even under moderate load. This setting accomplishes this by
adding a small amount of artificial delay—that is, rather than
immediately sending out a record the producer will wait for up to the
given delay to allow other records to be sent so that the sends can be
batched together. This can be thought of as analogous to Nagle’s
algorithm in TCP. This setting gives the upper bound on the delay for
batching: once we get batch.size worth of records for a partition it
will be sent immediately regardless of this setting, however if we have
fewer than this many bytes accumulated for this partition we will
*linger* for the specified time waiting for more records to show up.
This setting defaults to 0 (i.e. no delay). Setting linger.ms=5, for
example, would have the effect of reducing the number of requests sent
but would add up to 5ms of latency to records sent in the absence of
load.

          "default": 0,
          "minimum": 0

**deliveryTimeoutMs**

An upper bound on the time to report success or failure after a call to
send() returns. This limits the total time that a record will be delayed
prior to sending, the time to await acknowledgement from the broker (if
expected), and the time allowed for retriable send failures. The
producer may report failure to send a record earlier than this config if
either an unrecoverable error is encountered, the retries have been
exhausted, or the record is added to a batch which reached an earlier
delivery expiration deadline. The value of this config should be greater
than or equal to the sum of request.timeout.ms and linger.ms.

          "default": 120000,
          "minimum": 0

**clientId**

An id string to pass to the server when making requests. The purpose of
this is to be able to track the source of requests beyond just ip/port
by allowing a logical application name to be included in server-side
request logging.

          "default": ""

**sendBufferBytes**

The size of the TCP send buffer (SO\_SNDBUF) to use when sending data.
If the value is -1, the OS default will be used.

          "default": 131072,
          "minimum": -1

**receiveBufferBytes**

The size of the TCP receive buffer (SO\_RCVBUF) to use when reading
data. If the value is -1, the OS default will be used.

          "default": 32768,
          "minimum": -1

**maxRequestSize**

The maximum size of a request in bytes. This setting will limit the
number of record batches the producer will send in a single request to
avoid sending huge requests. This is also effectively a cap on the
maximum uncompressed record batch size. Note that the server has its own
cap on the record batch size (after compression if compression is
enabled) which may be different from this.

          "default": 1048576,
          "minimum": -1

**reconnectBackoffMs**

The base amount of time to wait before attempting to reconnect to a
given host. This avoids repeatedly connecting to a host in a tight loop.
This backoff applies to all connection attempts by the client to a
broker.

          "default": 50,
          "minimum": 0

**reconnectBackoffMaxMs**

The maximum amount of time in milliseconds to wait when reconnecting to
a broker that has repeatedly failed to connect. If provided, the backoff
per host will increase exponentially for each consecutive connection
failure, up to this maximum. After calculating the backoff increase, 20%
random jitter is added to avoid connection storms.

          "default": 1000,
          "minimum": 0

**retryBackoffMs**

The amount of time to wait before attempting to retry a failed request
to a given topic partition. This avoids repeatedly sending requests in a
tight loop under some failure scenarios.

          "default": 100,
          "minimum": 0

**maxBlockMs**

The configuration controls how long KafkaProducer.send() and
KafkaProducer.partitionsFor() will block.These methods can be blocked
either because the buffer is full or metadata unavailable.Blocking in
the user-supplied serializers or partitioner will not be counted against
this timeout.

          "default": 60000,
          "minimum": 0

**requestTimeoutMs**

The configuration controls the maximum amount of time the client will
wait for the response of a request. If the response is not received
before the timeout elapses the client will resend the request if
necessary or fail the request if retries are exhausted. This should be
larger than replica.lag.time.max.ms (a broker configuration) to reduce
the possibility of message duplication due to unnecessary producer
retries.

          "default": 30000,
          "minimum": 0

**metadataMaxAgeMs**

The period of time in milliseconds after which we force a refresh of
metadata even if we haven’t seen any partition leadership changes to
proactively discover any new brokers or partitions.

          "default": 30000,
          "minimum": 0

**metadataMaxIdleMs**

Controls how long the producer will cache metadata for a topic that’s
idle. If the elapsed time since a topic was last produced to exceeds the
metadata idle duration, then the topic’s metadata is forgotten and the
next access to it will force a metadata fetch request.

          "default": 300000,
          "minimum": 5000

**metricsSampleWindowMs**

The window of time a metrics sample is computed over.

          "default": 30000,
          "minimum": 0

**metricsNumSamples**

The number of samples maintained to compute metrics.

          "default": 2,
          "minimum": 1

**metricsRecordingLevel**

The highest recording level for metrics.

          "default": "INFO
          "enum": [
            "INFO
            "DEBUG"
          ]

**metricReporters**

A list of classes to use as metrics reporters. Implementing the
org.apache.kafka.common.metrics.MetricsReporter interface allows
plugging in classes that will be notified of new metric creation. The
JmxReporter is always included to register JMX statistics.

**maxInFlightRequestsPerConnection**

The maximum number of unacknowledged requests the client will send on a
single connection before blocking. Note that if this setting is set to
be greater than 1 and there are failed sends, there is a risk of message
re-ordering due to retries (i.e., if retries are enabled).

          "default": 5,
          "minimum": 1

**keySerializer**

Serializer class for key that implements the
org.apache.kafka.common.serialization.Serializer interface.

          "default": "org.apache.kafka.common.serialization.StringSerializer"

**valueSerializer**

Serializer class for value that implements the
org.apache.kafka.common.serialization.Serializer interface.

          "default": "org.apache.kafka.common.serialization.StringSerializer"

**connectionsMaxIdleMs**

Close idle connections after the number of milliseconds specified by
this config.

          "default": 540000

**partitionerClass**

Partitioner class that implements the
org.apache.kafka.clients.producer.Partitioner interface.

          "default": "org.apache.kafka.clients.producer.internals.DefaultPartitioner"

**interceptorClasses**

A list of classes to use as interceptors. Implementing the
org.apache.kafka.clients.consumer.ConsumerInterceptor interface allows
you to intercept (and possibly mutate) records received by the consumer.
By default, there are no interceptors.

**securityProtocol**

Protocol used to communicate with brokers.

          "default": "PLAINTEXT
          "enum": [
            "PLAINTEXT
            "SSL
            "SASL_PLAINTEXT
            "SASL_SSL"
          ]

**securityProviders**

A list of configurable creator classes each returning a provider
implementing security algorithms. These classes should implement the
org.apache.kafka.common.security.auth.SecurityProviderCreator interface.

**enableIdempotence**

When set to *true*, the producer will ensure that exactly one copy of
each message is written in the stream. If *false*, producer retries due
to broker failures, etc., may write duplicates of the retried message in
the stream. Note that enabling idempotence requires
max.in.flight.requests.per.connection to be less than or equal to 5,
retries to be greater than 0 and acks must be *all*. If these values are
not explicitly set by the user, suitable values will be chosen. If
incompatible values are set, a ConfigException will be thrown.

          "default": false

**transactionTimeoutMs**

The maximum amount of time in ms that the transaction coordinator will
wait for a transaction status update from the producer before
proactively aborting the ongoing transaction.If this value is larger
than the transaction.max.timeout.ms setting in the broker, the request
will fail with a InvalidTransactionTimeout error.

          "default": 60000

**transactionalId**

The TransactionalId to use for transactional delivery. This enables
reliability semantics which span multiple producer sessions since it
allows the client to guarantee that transactions using the same
TransactionalId have been completed prior to starting any new
transactions. If no TransactionalId is provided, then the producer is
limited to idempotent delivery. If a TransactionalId is configured,
enable.idempotence is implied. By default the TransactionId is not
configured, which means transactions cannot be used. Note that, by
default, transactions require a cluster of at least three brokers which
is the recommended setting for production; for development you can
change this, by adjusting broker setting
transaction.state.log.replication.factor.

          "default": ""
